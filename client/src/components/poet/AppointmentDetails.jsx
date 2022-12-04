import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authServices from "../Services/AuthServices";
import readerServices from "../Services/ReaderServices";
import alert from "../Services/Alert";
const AppointmentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctor, setDoctor] = React.useState(location.state.doctor);
  const [timeCount, setTimeCount] = React.useState(doctor.doctorTime.charAt(0));
  const [data, setData] = React.useState({
    timing: "",
    address: "",
    disease: "",
    date: "",
  });
  const pay = (e) => {
    e.preventDefault();
    readerServices
      .validateRequest(authServices.getLoggedInUser()._id, {
        doctorId: doctor._id,
        data: data,
      })
      .then((res) => {
        navigate("/payment", {
          state: { amount: doctor.fee, doctorId: doctor._id, data: data },
        });
      })
      .catch((err) => alert.showErrorAlert(err.response.data.message));
  };
  function handleData(key, value) {
    setData({ ...data, [key]: value });
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
        <h1>Appointment Details</h1>
      </div>

      <section className=" ">
        <div className="container">
          <div className="row from-row shadow-lg" id="appointment-form">
            <div className="col-lg-6 form-brand text-center ">
              <h2 className="mt-3">Doctor Details</h2>
              <div className="row mt-5">
                <div className="col-lg-12 ">
                  <img
                    src={doctor.img}
                    alt="image"
                    id="appointmentDetailsimg"
                  />
                </div>

                <div className="col-lg-12 mt-5">
                  <h1>{doctor.username}</h1>
                </div>
              </div>
              <div className="row mt-3 ">
                <div className="col-lg-12">
                  <h6>Specialization : {doctor.specialization}</h6>
                  <h6> Fee : {doctor.fee} pkr</h6>
                  <h6> Timing : {doctor.doctorTime}</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-6 px-5">
              <div>
                <h2 className="mt-3">Patient Details</h2>
                <form onSubmit={(e) => pay(e)}>
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
                        handleData("date", e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group mb-2 col-lg-9">
                    <label className="form-label " for="userType">
                      Select Time
                    </label>
                    <select
                      id="userType"
                      className="form-control dropdownMenu"
                      onChange={(e) => {
                        handleData("timing", e.target.value);
                      }}
                      required
                    >
                      <option value={1}>
                        {timeCount}:00 to {Number(timeCount) + 1}:00
                      </option>
                      <option value={2}>
                        {Number(timeCount) + 1}:00 to {Number(timeCount) + 2}:00
                      </option>
                      <option value={3}>
                        {Number(timeCount) + 2}:00 to {Number(timeCount) + 3}:00
                      </option>
                      <option value={4}>
                        {Number(timeCount) + 3}:00 to {Number(timeCount) + 4}:00
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary signIn-btn mb-5 mt-2"
                  >
                    Payment
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

export default AppointmentDetails;
