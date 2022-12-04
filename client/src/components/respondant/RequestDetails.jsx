import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import readerServices from "../Services/ReaderServices";
import authServices from "../Services/AuthServices";
import alert from "../Services/Alert";
const RequestDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [respondant, setRespondant] = React.useState(location.state.respondant);

  const [isSugar, setSugar] = React.useState(false);
  const [isInject, setInject] = React.useState(false);
  const [isVital, setVital] = React.useState(false);
  const [isBp, setBp] = React.useState(false);
  const [isFirstAid, setFirstAid] = React.useState(false);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  const [data, setData] = React.useState({
    address: "",
    datetime: "",
    disease: "",
    purposes: [],
  });

  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }
  function sendRequest(e) {
    if (isSugar) data.purposes.push("Sugar");
    if (isInject) data.purposes.push("Injections");
    if (isVital) data.purposes.push("Vital");
    if (isFirstAid) data.purposes.push("FirstAid");
    if (isBp) data.purposes.push("Blood-Pressure");
    e.preventDefault();
    data.datetime = date + "T" + time;
    readerServices
      .requestRespondant(authServices.getLoggedInUser()._id, {
        respondantId: respondant._id,
        data: data,
      })
      .then((data) => {
        alert.showSuccessAlert("Request Sent successfully!");
        navigate("/dashboard");
      })
      .catch((err) => {
        alert.showErrorAlert(err.response.data.message);
      });
  }

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <div id="appointment-Section" className="mb-5">
      <div className="d-flex justify-content-center mb-3">
        <h1>Respondant Request Details</h1>
      </div>

      <section className=" ">
        <div className="container">
          <div className="row from-row shadow-lg" id="appointment-form">
            <div className="col-lg-6 form-brand text-center ">
              <h2 className="mt-3">Respondant Details</h2>
              <div className="row mt-5">
                <div className="col-lg-12 ">
                  <img
                    src={respondant.img}
                    alt="image"
                    id="appointmentDetailsimg"
                  />
                </div>

                <div className="col-lg-12 mt-5">
                  <h1>{respondant.username}</h1>
                </div>
              </div>
              <div className="row mt-3 ">
                <div className="col-lg-12">
                  <h6>Contact no : {respondant.phone}</h6>
                  <h6> Email : {respondant.email}</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-6 px-5">
              <div>
                <h2 className="mt-3">Patient Details</h2>
                <form onSubmit={(e) => sendRequest(e)}>
                  <div class="mb-2 col-lg-9">
                    <label for="exampleInputPassword1" class="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      onChange={(e) => {
                        handleData("address", e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div class="mb-2 col-lg-9">
                    <label for="exampleInputEmail1" class="form-label">
                      Purpose
                    </label>

                    <div>
                      {" "}
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="Sugar"
                          id="flexCheckDefault"
                          onChange={(e) => setSugar(e.target.checked)}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Sugar
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="BP"
                          id="flexCheckDefault2"
                          onChange={(e) => setBp(e.target.checked)}
                        />
                        <label class="form-check-label" for="flexCheckDefault2">
                          BP
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="Vital check"
                          id="flexCheckDefault3"
                          onChange={(e) => setVital(e.target.checked)}
                        />
                        <label class="form-check-label" for="flexCheckDefault3">
                          Vital check
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="First Aid"
                          id="flexCheckDefault4"
                          onChange={(e) => setFirstAid(e.target.checked)}
                        />
                        <label class="form-check-label" for="flexCheckDefault4">
                          First Aid
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=" Injection"
                          id="flexCheckDefault5"
                          onChange={(e) => setInject(e.target.checked)}
                        />
                        <label class="form-check-label" for="flexCheckDefault5">
                          Injection
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="mb-2 col-lg-9">
                    <label for="exampleInputEmail1" class="form-label">
                      Disease
                    </label>
                    <textarea
                      id="w3review"
                      name="exampleInputEmail1"
                      rows="4"
                      cols="50"
                      className="form-control"
                      onChange={(e) => {
                        handleData("disease", e.target.value);
                      }}
                      required
                    ></textarea>
                  </div>
                  <div class="mb-2 col-lg-9">
                    <label for="exampleInputPassword1" class="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      id="exampleInputPassword1"
                      min={disablePastDate()}
                      max={disablePastDate()}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group mb-2 col-lg-9">
                    <label className="form-label " for="userType">
                      Select Time
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      id="exampleInputPassword1"
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary signIn-btn mb-5 mt-2"
                  >
                    Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestDetails;
