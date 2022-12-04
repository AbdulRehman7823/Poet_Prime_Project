import React from "react";
import authServices from "../Services/AuthServices";
import alert from "../Services/Alert";
import readerServices from "../Services/ReaderServices";

import { useNavigate } from "react-router-dom";
const Stakeholder = ({ stakeholder, dataType, chat }) => {
  let navigate = useNavigate();
  var data = {};
  function sendRequest(_id) {
    if (authServices.getLoggedInUser() == undefined) {
      alert.showErrorAlert("You should must login");
      navigate("/login");
      return;
    }
    if (dataType == "Doctors") {
      navigate("/appointmentDetails", { state: { doctor: stakeholder } });
    } else if (dataType == "Respondants") {
      navigate("/requestDetails", { state: { respondant: stakeholder } });
    }

    // var method = () => {};
    // if (dataType == "Doctors") {
    //   method = customerServices.requestDoctor;
    //   data = { doctorId: _id };
    // } else if (dataType == "Respondants") {
    //   method = customerServices.requestRespondant;
    //   data = { respondantId: _id };
    // }

    // method(authServices.getLoggedInUser()._id, data)
    //   .then((data) => {

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  function getButtonName() {
    if (dataType === "Doctors") return "Book Appointment";
    else return "Book Now";
  }
  return (
    <div>
      <div class="card my-3 shadow" style={{ maxWidth: "540px" }}>
        <div className="row">
          <div class="col-4 d-inline my-4 d-flex justify-content-center align-items-center">
            <img
              src={stakeholder.img}
              class="img-fluid rounded-circle ms-2"
              alt="..."
            />
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title m-0">{stakeholder.username}</h5>
              <p class="card-text m-0">{stakeholder.specialization}</p>
              <p class="card-text m-0">{stakeholder.phone}</p>
              <p class="card-text">
                <a>{stakeholder.email}</a>
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <button
                  className="btn btn-info text-white fw-bold"
                  onClick={(e) => {
                    sendRequest(stakeholder._id);
                  }}
                  style={{ marginRight: 5 }}
                >
                  {getButtonName()}
                </button>

                {dataType === "Doctors" && chat === true ? (
                  <button
                    className="btn btn-info text-white fw-bold"
                    onClick={() => {
                      navigate("/patient/chat", {
                        state: { doctor: stakeholder },
                      });
                    }}
                  >
                    Chat
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stakeholder;
