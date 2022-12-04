import React, { useState } from "react";
import axios from "axios";
import authServices from "../Services/AuthServices";
import alert from "../Services/Alert";
import { useNavigate } from "react-router-dom";
const PatientsDetail = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [viewPatient, setViewPatient] = useState({});
  function getData() {
    axios
      .get(
        "https://ar-medicare-backend.herokuapp.com/api/doctor/doctorPatientsHistory/" +
          authServices.getLoggedInUser()._id
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  function updateHandler(dataItem) {
    navigate("/doctorAppointments/addPatientDescription", {
      state: {
        formTitle: "Update Description",
        btnText: "Update",
        patient: dataItem,
      },
    });
  }

  function viewHandler(dataItem) {
    setViewPatient(dataItem);
  }
  function removeHandler(dataItem) {
    console.log(dataItem.patientId);
    axios
      .post(
        "https://ar-medicare-backend.herokuapp.com/api/doctor/patientDetail/delete/" +
          authServices.getLoggedInUser()._id,
        { patientId: dataItem.patientId }
      )
      .then((res) => {
        alert.showSuccessAlert("Description removed successfully!");
        getData();
      })
      .catch((err) => alert.showErrorAlert(err.response));
  }
  React.useEffect(getData, []);
  return (
    <div className="container" id="patientDetailTable">
      <div>
        <h1>Patients Detail</h1>
      </div>
      <div className="patient-table-wrapper">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th className="tbl-col" scope="col">
                Name
              </th>
              <th className="tbl-col" scope="col">
                Age
              </th>
              <th className="tbl-col" scope="col">
                Symptoms
              </th>

              <th className="tbl-col" scope="col">
                Diagnosis
              </th>

              <th className="tbl-col" scope="col">
                Reschedulling visit
              </th>
              <th className="tbl-col" scope="col">
                Date Time
              </th>
              <th className="tbl-col" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((dataItem) => (
              <tr>
                <td>{dataItem.username}</td>
                <td>{dataItem.age}</td>
                <td>{dataItem.symptoms}</td>
                <td>{dataItem.diagnosis}</td>
                {/* <td>{dataItem.prescription}</td> */}
                <td>{dataItem.rescheduleVisit}</td>
                <td>{dataItem.dateTime}</td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={(e) => removeHandler(dataItem)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success me-2"
                    onClick={(e) => updateHandler(dataItem)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={(e) => viewHandler(dataItem)}
                  >
                    view
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header" id="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Patient Details
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h6>
                <strong>Patient Name:</strong>
              </h6>
              <h6>{viewPatient.username}</h6>
              <hr></hr>
              <h6>
                <strong>Patient Age:</strong>
              </h6>
              <h6>{viewPatient.age}</h6>
              <hr></hr>
              <h6>
                <strong>Symptoms:</strong>
              </h6>
              <h6>{viewPatient.symptoms}</h6>
              <hr></hr>
              <h6>
                <strong>Diagnosis:</strong>
              </h6>
              <h6>{viewPatient.diagnosis}</h6>
              <hr></hr>
              <h6>
                <strong>Reschedule Status:</strong>
              </h6>
              <h6>{viewPatient.rescheduleVisit}</h6>
              <hr></hr>
              <h6>
                <strong>Date&Time:</strong>
              </h6>
              <h6>{viewPatient.dateTime}</h6>
              <hr></hr>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsDetail;
