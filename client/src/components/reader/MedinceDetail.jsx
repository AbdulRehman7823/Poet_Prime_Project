import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import authServices from "../Services/AuthServices";
import { useNavigate } from "react-router-dom";
import alert from "../Services/Alert";
import readerServices from "../Services/ReaderServices";
import ReadMoreReadLess from "../ReadMoreReadLess";
const MedinceDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [medicine, setMedcine] = useState(location.state.medicine);
  function addToCart(_id) {
    if (!authServices.isLoggedIn()) {
      alert.showErrorAlert("You should must Login");
      navigate("/login");
      return;
    }
    readerServices
      .addToCart(_id, { userId: authServices.getLoggedInUser()._id })
      .then((data) => {
        console.log(data);
        alert.showSuccessAlert("Product added to cart successfully");
        navigate("/medicines");
      })
      .catch((err) => {
        alert.showErrorAlert(err.response.data.message);
      });
  }
  return (
    <div>
      <div className="container" id="medicine-details">
        <div className="row from-row shadow-lg" id="appointment-form">
          <div className="col-lg-6 form-brand text-center ">
            <h2 className="mt-3">Medicine Details</h2>
            <div className="row mt-5">
              <div className="col-lg-12 ">
                <img
                  src={medicine.img}
                  alt="image"
                  id="appointmentDetailsimg"
                />
              </div>

              <div className="col-lg-12 my-3">
                <h1>{medicine.title}</h1>
              </div>
            </div>
          </div>
          <div className="col-lg-6 p-5">
            <h5>Description</h5>
            <h6>
              {medicine.description.length > 20 ? (
                <ReadMoreReadLess
                  limit={20}
                  children={medicine.description.substr(21, 30)}
                />
              ) : (
                medicine.description
              )}
            </h6>
            <hr />
            <h5>Price</h5>
            <h6>{medicine.price}</h6>
            <hr />
            <h5>InStock</h5>
            <h6>{medicine.quantity}</h6>
            <hr />
            <button
              className="btn btn-primary mt-5"
              onClick={(e) => addToCart(medicine._id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedinceDetail;
