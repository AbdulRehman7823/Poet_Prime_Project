import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authServices from "../Services/AuthServices";
import alert from "../Services/Alert";
import readerServices from "../Services/ReaderServices";
import doctorServices from "../Services/DoctorServices";
const PatientDescription = () => {
  let navigate = useNavigate();
  const location = useLocation();
  var method = () => {};
  const [comboxItems, setComboBoxItems] = useState([]);
  const [comboxValue, setComboBoxValue] = useState("");
  const [comboxQty, setComboBoxqty] = useState("");
  const [presList, setPresList] = useState([]);
  const [textareaString, setTextAreaString] = useState("");
  const [updatePatient, setUpdatePatient] = useState({});
  const [formHeading, setFormHeading] = useState("");
  const [btnText, setBtnText] = useState("");
  const [isPrescriptionError, setIsPrescriptionError] = useState(false);
  const [data, setData] = React.useState({
    username: location.state.patient.username,
    age: "",
    dateTime: "",
    symptoms: "",
    diagnosis: "",
    prescription: presList,
    rescheduleVisit: "",
  });
  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }

  function validatePrescription(text) {
    return comboxItems.some(function (el) {
      return el.title === text;
    });
  }
  function handleDetails() {
    setPresList(presList);
    console.log(presList);
    let message = "";
    if (location.state.btnText === "Update") {
      method = doctorServices.updatePatientDetails;
      message = "Description updated succcessfully!!!";
    } else if (location.state.btnText === "Add") {
      method = doctorServices.addPatientDetails;
      message = "Description added succcessfully!!!";
    }
    console.log(method);
    method(
      authServices.getLoggedInUser()._id,
      location.state.patient.patientId,
      data
    )
      .then((data) => {
        alert.showSuccessAlert(message);
        navigate("/patientsDetail");
      })
      .catch((err) => alert.showErrorAlert(err.response.data.message));
  }

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd + "T00:00";
  };
  React.useEffect(() => {
    readerServices
      .getProducts()
      .then((data) => setComboBoxItems(data))
      .catch((err) => alert.showErrorAlert(err.response.data.message));
  }, []);
  React.useEffect(() => {
    if (location.state.btnText === "Update") {
      let tdata = {
        username: location.state.patient.username,
        age: location.state.patient.age,
        dateTime: location.state.patient.dateTime,
        symptoms: location.state.patient.symptoms,
        diagnosis: location.state.patient.diagnosis,
        prescription: location.state.patient.prescription,
        rescheduleVisit: location.state.patient.rescheduleVisit,
      };
      setData(tdata);
      setFormHeading(location.state.formTitle);
      setBtnText(location.state.btnText);
      console.log(updatePatient);
    } else if (location.state.btnText === "Add") {
      setFormHeading(location.state.formTitle);
      setBtnText(location.state.btnText);
    }
  }, []);
  return (
    <section className="login-form shadow-lg">
      <div className="container">
        <div className="row from-row">
          <div className="col-lg-5 d-flex align-items-center text-center form-brand ">
            <div>
              <h1>AR MEDICARE</h1>
              <h3>Pakistan's Medicare is now online</h3>
            </div>
          </div>
          <div className="col-lg-7 px-5">
            <h2 className="mt-3">{formHeading}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleDetails();
              }}
            >
              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={location.state.patient.username}
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    handleData("username", e.target.value);
                  }}
                  required
                  disabled
                />
              </div>
              <div class="mb-2 col-lg-9">
                <label for="exampleInputEmail1" class="form-label">
                  Age
                </label>
                <input
                  value={data.age}
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  min={1}
                  onChange={(e) => {
                    handleData("age", e.target.value);
                  }}
                  onKeyPress={(event) => {
                    if (!/[1-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  required
                />
              </div>
              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  Date and Time
                </label>
                <input
                  value={data.dateTime}
                  type="datetime-local"
                  class="form-control"
                  id="exampleInputPassword1"
                  min={disablePastDate()}
                  max={disablePastDate()}
                  onChange={(e) => {
                    handleData("dateTime", e.target.value);
                  }}
                  required
                />
              </div>
              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  Symptoms
                </label>
                <input
                  value={data.symptoms}
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    handleData("symptoms", e.target.value);
                  }}
                  required
                />
              </div>
              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  Diagnosis
                </label>
                <input
                  value={data.diagnosis}
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    handleData("diagnosis", e.target.value);
                  }}
                  required
                />
              </div>
              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  Prescription
                </label>
                <div className="row">
                  <div className="col-lg-8 ">
                    <input
                      list="browsers"
                      className="form-control"
                      onChange={(e) => {
                        setComboBoxValue(e.target.value);
                      }}
                    />
                    <datalist id="browsers">
                      {comboxItems != undefined ? (
                        comboxItems.map((value) => (
                          <option value={value.title} />
                        ))
                      ) : (
                        <></>
                      )}
                    </datalist>
                  </div>

                  <div className="col-lg-4">
                    <input
                      type="number"
                      placeholder="qty"
                      required
                      className="form-control"
                      min={1}
                      onKeyPress={(event) => {
                        if (!/[1-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        setComboBoxqty(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <input
                  type="button"
                  className="btn btn-primary mt-2"
                  value="Add"
                  onClick={(e) => {
                    if (validatePrescription(comboxValue)) {
                      setIsPrescriptionError(false);
                      presList.push({
                        title: comboxValue,
                        quantity: comboxQty,
                      });
                      setTextAreaString(
                        textareaString + comboxValue + " " + comboxQty + "\n"
                      );
                    } else setIsPrescriptionError(true);

                    console.log(presList);
                  }}
                />
              </div>
              {isPrescriptionError ? (
                <div style={{ color: "red" }}>Invalid medicine!</div>
              ) : (
                <></>
              )}
              <div class="mb-2 col-lg-9">
                <textarea
                  name="message"
                  rows="4"
                  cols="30"
                  className="form-control"
                  value={textareaString}
                  required
                ></textarea>
              </div>
              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  Reschedule Visit
                </label>
                <input
                  value={data.rescheduleVisit}
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    handleData("rescheduleVisit", e.target.value);
                  }}
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary signIn-btn mb-5">
                {btnText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientDescription;
