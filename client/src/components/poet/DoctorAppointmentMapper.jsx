import doctorServices from "../Services/DoctorServices";
import authServices from "../Services/AuthServices";
import React, { useState } from "react";
import DoctorAppointment from "./DoctorAppointment";
import RiseLoader from "react-spinners/RiseLoader";
const DoctorAppointmentMapper = () => {
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = useState(false);
  function setData() {
    setLoading(true);
    doctorServices
      .getPatients(authServices.getLoggedInUser()._id)
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  React.useEffect(setData, []);
  return (
    <div className="container" id="requestsPage">
      <h1 style={{ marginTop: "5rem" }}>Appointments</h1>

      <div className="d-flex justify-content-center">
        <RiseLoader
          color={"#2237ac"}
          loading={loading}
          css={"margin-top:300px"}
        />
      </div>
      {requests.length == 0 && !loading ? (
        <p>There is no data </p>
      ) : (
        <div className="row cardLayOut justify-content-center">
          {requests.map((appointment, key) => (
            <div className="col-lg-5 ">
              <DoctorAppointment key={key} appointment={appointment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointmentMapper;
