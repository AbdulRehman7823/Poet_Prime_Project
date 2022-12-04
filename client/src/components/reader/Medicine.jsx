import React from "react";
import { useNavigate } from "react-router-dom";

const Medicine = ({ item }) => {
  const navigate = useNavigate();

  function cardClick() {
    navigate("/medicineDetail", { state: { medicine: item } });
  }
  return (
    <div>
      <div className="card shadow-lg" id="MedicineCard">
        <img
          onClick={cardClick}
          className="card-img-top "
          id="productImg"
          src={item.img}
          alt="Card image cap"
        />
        <div className="card-body d-flex flex-column">
          <div id="textoverflow">
            <h5 className="card-title">{item.title}</h5>
          </div>

          <div className="d-flex mt-auto">
            <h5 className="mt-1 ms-2">Price</h5>
            <p className="card-text col-6 mt-1 ms-5">
              <strong>{item.price}PKR/Pack</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Medicine;
