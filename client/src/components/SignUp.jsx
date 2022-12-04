import React from "react";
import FileUploader from "../components/FileUploader";
import convertImageToBase64 from "../components/ImageBase64";
import { uploadImage } from "../components/ImageUpload";
import { useNavigate } from "react-router-dom";
import alert from "./Services/Alert";
import rederSerrvices from "./Services/ReaderServices";
import authServices from "./Services/AuthServices";
const SignUp = () => {
  let navigate = useNavigate();
  const [imgUrl, setImgUrl] = React.useState();
  const [data, setData] = React.useState({
    userType: "poet",
    username: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    img: "",
  });
  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }

  const onDrop = (acceptedFiles, rejectedFiles, imgName) => {
    if (rejectedFiles.length > 0) {
      alert.showWarningAlert("Upload only one image and size limit of 1 MB");
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              handleData("img", `${url}`);
              setImgUrl(acceptedFiles[0].name);
            }
          });
        }
      });
    }
  };
  function StrengthChecker() {
    let strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );

    if (strongPassword.test(data.password)) {
      return true;
    } else {
      return false;
    }
  }
  function validatePhoneNumber() {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{6})$/;
    if (data.phone.match(phoneno)) return true;
    else return false;
  }
  function signUp(e) {
    e.preventDefault();
    if (!data.img) {
      alert.showErrorAlert("Please upload image");
      return;
    }

    if (!validatePhoneNumber()) {
      alert.showErrorAlert("Please enter the phone number in correct format");
      return;
    }
    authServices
      .registerUser(data)
      .then((data) => {
        alert.showSuccessAlert("The user registered successfully!");
        navigate("/login");
      })
      .catch((err) => {
        alert.showErrorAlert(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
  return (
    <section className="login-form shadow-lg">
      <div className="container">
        <div className="row from-row">
          <div className="col-lg-5 d-flex align-items-center text-center form-brand ">
            <div>
              <h1>Poet Prime</h1>
              <h4>To be a poet is condition, not a profession</h4>
            </div>
          </div>
          <div className="col-lg-7 px-5">
            <h2 className="mt-3">Sign up</h2>
            <form onSubmit={(e) => signUp(e)}>
              <div className="form-group mb-2 col-lg-9">
                <label className="form-label " for="userType">
                  Select Account Type
                </label>
                <select
                  id="userType"
                  className="form-control dropdownMenu"
                  onChange={(e) => {
                    handleData("userType", e.target.value);
                  }}
                  required
                >
                  <option value="poet">Poet</option>
                  <option value="reader">Reader</option>
                </select>
              </div>
              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    handleData("username", e.target.value);
                  }}
                  onKeyPress={(event) => {
                    if (!/^[a-zA-Z]+$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  required
                />
              </div>
              <div class="mb-2 col-lg-9">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    handleData("email", e.target.value);
                  }}
                  required
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    handleData("password", e.target.value);
                  }}
                  required
                />
              </div>
              {!data.password ? (
                <></>
              ) : !StrengthChecker() ? (
                <div className="text-danger">
                  Please choose some Strong password
                </div>
              ) : (
                <></>
              )}

              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  Phone number
                </label>
                <input
                  placeholder="+923XXXXXXXXX"
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    handleData("phone", e.target.value);
                  }}
                  required
                />
              </div>
              {!data.phone ? (
                <></>
              ) : !validatePhoneNumber() ? (
                <div className="text-danger">
                  Please enter correct phone number
                </div>
              ) : (
                <></>
              )}
              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  City
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    handleData("city", e.target.value);
                  }}
                  required
                />
              </div>
              <div class="mb-2 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  upload an image
                </label>

                <FileUploader
                  placeholder={imgUrl ? imgUrl : "Click here to upload"}
                  accept={["image/jpeg", "image/png", "image/bmp"]}
                  maxFiles={1}
                  maxSize={1000000}
                  onDrop={(acceptedFiles, rejectedFiles) =>
                    onDrop(acceptedFiles, rejectedFiles, "frontSideImage")
                  }
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary signIn-btn my-2 mb-4"
              >
                SignUp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
