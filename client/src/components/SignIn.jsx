import React, { useState } from "react";
import { RiseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import authServices from "./Services/AuthServices";
import alert from "./Services/Alert";
const SignIn = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }
  function login(e) {
    setLoading(true);
    e.preventDefault();
    authServices
      .login(data)
      .then((data) => {
        if (data.userType == "reader") {
          alert.showSuccessAlert("You are logged in successfully!");
          navigate("/dashboard");
        } else if (data.userType == "poet") {
          alert.showSuccessAlert("You are logged in successfully!");
          navigate("/doctorAppointments");
        }
        setLoading(false);
        window.location.reload(false);
      })
      .catch((err) => {
        alert.showErrorAlert(err.response.data.message);
        setLoading(false);
      });
  }
  return (
    <div id="login-wrapper">
      {loading == false ? (
        <>
          <section className="login-form shadow-lg">
            <div className="d-flex justify-content-center"></div>
            <div className="container">
              <div className="row from-row">
                <div className="col-lg-5 form-brand d-flex justify-content-center align-items-center">
                  <div>
                    <h1>Poet Prime</h1>
                    <h4>To be a poet is condition, not a profession</h4>
                  </div>
                </div>
                <div className="col-lg-7 px-5">
                  <h2 className="mt-3">Login</h2>

                  <form onSubmit={(e) => login(e)}>
                    <div class="mb-3 col-lg-9">
                      <label for="exampleInputEmail1" class="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => handleData("email", e.target.value)}
                        required
                      />
                      <div id="emailHelp" class="form-text">
                        We'll never share your email with anyone else.
                      </div>
                    </div>
                    <div class="mb-3 col-lg-9">
                      <label for="exampleInputPassword1" class="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) => handleData("password", e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary signIn-btn mb-5"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <RiseLoader
              color={"#2237ac"}
              loading={loading}
              css={"margin-top:400px"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
