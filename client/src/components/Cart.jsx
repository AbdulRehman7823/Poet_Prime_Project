import axios from "axios";
import React from "react";
import IncDecCounter from "./IncDecCounter";
import { toast } from "react-toastify";
import readerServices from "./Services/ReaderServices";
import RiseLoader from "react-spinners/RiseLoader";
import alert from "./Services/Alert";
import { useState } from "react";
import authServices from "./Services/AuthServices";
const Cart = () => {
  var outofstock = {};
  const [quantity, setQuantity] = useState(0);
  const [tData, setTData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(
    authServices.getLoggedInUser()._id
  );
  function getData() {
    setLoading(true);
    readerServices
      .getCartItems()
      .then(async (data) => {
        let filterProd = await data.cart.filter((item) => {
          return item.userId == loggedInUser;
        });
        setItems(filterProd);
        setTData(filterProd);
        console.log(filterProd);
        setLoading(false);
      })

      .catch((err) => {
        console.log(err);
      });
  }
  function validateOrderQuantity() {
    for (let i = 0; i < tData.length; i++) {
      if (tData[i].orderQuantity > tData[i].quantity) {
        outofstock = tData[i];
        return false;
      }
      console.log(tData.orderQuantity);
      console.log(tData.quantity);
    }
    return true;
  }
  function checkOut() {
    if (validateOrderQuantity()) {
      readerServices
        .checkout(tData)
        .then((data) => {
          window.location.href = data.url;
        })
        .catch((err) => alert.showErrorAlert(err.response.data.message));
    } else
      alert.showErrorAlert(
        outofstock.title +
          "is out of stock " +
          outofstock.quantity +
          " quantity is available"
      );
  }
  function removeItem(_id) {
    readerServices
      .removeItem(_id)
      .then((res) => {
        console.log(res);
        getData();
        alert.showSuccessAlert("Item removed Successfully");
      })
      .catch((err) => alert.showErrorAlert(err.response.data.message));
  }

  const [items, setItems] = React.useState([]);
  React.useEffect(getData, []);

  return (
    <div className="container" id="cartBody">
      <h1>My Cart</h1>
      <div className="d-flex justify-content-center">
        <RiseLoader
          color={"#2237ac"}
          loading={loading}
          css={"margin-top:300px"}
        />
      </div>
      {items.length == 0 && !loading ? (
        <p>There is no item in cart </p>
      ) : loading ? (
        <></>
      ) : (
        <>
          <div id="cartTable" className="container pt-3">
            <table className="table shadow-lg ">
              <thead id="cart-header">
                <tr>
                  <th scope="col">Item name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      {
                        <IncDecCounter
                          setTData={setTData}
                          items={items}
                          itemId={item._id}
                          tData={tData}
                        />
                      }
                    </td>
                    <td>
                      <input
                        type="button"
                        value="Remove"
                        className="btn btn-danger"
                        onClick={(e) => {
                          removeItem(item._id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="container text-center">
              <button
                className="btn btn-primary signIn-btn "
                id="checkOutButton-btn"
                onClick={checkOut}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
