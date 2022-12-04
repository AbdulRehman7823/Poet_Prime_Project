import React from "react";
import Stakeholder from "./Stakeholder";
import RiseLoader from "react-spinners/RiseLoader";
import authServices from "../Services/AuthServices";
import axios from "axios";
const StakeholderMapper = ({ method, dataType }) => {
  const [loading, setLoading] = React.useState(false);
  const [stakeholders, setStakeholders] = React.useState([]);
  const [patientDoctors, setPatientDoctors] = React.useState([]);
  function getData() {
    setStakeholders([]);
    setLoading(true);

    dataType === "Doctors" && authServices.isLoggedIn()
      ? method()
          .then((res) => {
            axios
              .get(
                "https://ar-medicare-backend.herokuapp.com/api/patient/doctors/" +
                  authServices.getLoggedInUser()._id
              )
              .then((data) => {
                setPatientDoctors(data.data);

                for (var i = 0; i < res.length; i++) {
                  for (var j = 0; j < data.data.length; j++) {
                    if (res[i]._id === data.data[j]._id) {
                      res.splice(i, 1);
                    }
                  }
                }
                setStakeholders(res);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          })
      : method()
          .then((data) => {
            console.log(data);
            setStakeholders(data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
  }
  React.useEffect(getData, [dataType]);
  return (
    <div className="container" id="stakeholder">
      <h1 style={{ marginTop: "5rem" }}>{dataType}</h1>
      <div className="d-flex justify-content-center">
        <RiseLoader
          color={"#2237ac"}
          loading={loading}
          css={"margin-top:300px"}
        />
      </div>
      {stakeholders.length == 0 && !loading ? (
        <p>There is no data </p>
      ) : (
        <div className="row cardLayOut justify-content-center">
          {dataType === "Doctors" ? (
            patientDoctors.map((stakeholder, key) => (
              <div className="col-lg-5 ">
                <Stakeholder
                  key={key}
                  stakeholder={stakeholder}
                  dataType={dataType}
                  chat={true}
                />
              </div>
            ))
          ) : (
            <></>
          )}
          {stakeholders.map((stakeholder, key) => (
            <div className="col-lg-5 ">
              <Stakeholder
                key={key}
                stakeholder={stakeholder}
                dataType={dataType}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StakeholderMapper;
