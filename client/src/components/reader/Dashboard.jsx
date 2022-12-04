import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();
  return (
    <div className="container-fluid px-0">
      <div className="row container-fluid px-0 mx-auto dashboard-brand">
        <div className="px-0 col-lg-5 col-6 m-5  text-dark ">
          <div className="ms-5 mt-5 text-white">
            <h1 className="">We have Best Medicare plan options for you</h1>
            <h5>Find a doctor today and book your appointment online now</h5>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-3 justify-content-center">
          <div className="col-lg-4 text-center">
            <h1>Our Services</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-5  ">
            <div className="card my-3 shadow" style={{ maxWidth: "540px" }}>
              <div className="row">
                <div className="col-4 d-inline">
                  <img
                    src="images/doctoLogo.png"
                    className="img-fluid rounded-circle"
                    alt="..."
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title">Doctors</h5>
                    <p className="card-text"></p>
                    <button
                      className="btn btn-card btn-primary"
                      onClick={() => navigate("/doctors")}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-5  ">
            <div className="card my-3 shadow" style={{ maxWidth: "540px" }}>
              <div className="row">
                <div className="col-4 d-inline">
                  <img
                    src="images/nurseLogo.jpg"
                    className="img-fluid rounded-circle"
                    alt="..."
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title">Respondants</h5>
                    <p className="card-text"></p>
                    <button
                      className="btn btn-card btn-primary"
                      onClick={(e) => navigate("/respondants")}
                    >
                      Consult Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="text-center mb-4 ">
            <h3 className="text-center mb-5 mt-2 pb-2 text-primary fw-bold">
              Find doctors by health concern
            </h3>
          </div>
          <div className="row justify-content-center">
            <div className="row mt-2 text-center text-dark">
              <div className="col-md-2">
                <div className="img-holder">
                  <img
                    className="findDoc"
                    src="images/gynacologist.jpeg"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4"> Gynecologist</h5>
                </div>
              </div>
              <div className="col-md-2 ">
                <div className="img-holder ">
                  <img
                    className="findDoc"
                    src="images/skinspecialist.jpeg"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4"> Skin Specialist</h5>
                </div>
              </div>
              <div className="col-md-2">
                <div className="img-holder">
                  <img
                    className="findDoc"
                    src="images/childSpecialist.jpeg"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4">Child Specialist</h5>
                </div>
              </div>
              <div className="col-md-2">
                <div className="img-holder">
                  <img
                    className="findDoc"
                    src="images/eyespecilaist.jpeg"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4"> Eye Specialist</h5>
                </div>
              </div>
              <div className="col-md-2">
                <div className="img-holder">
                  <img
                    className="findDoc"
                    src="images/diagnostic.jpeg"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4"> Diagnostics</h5>
                </div>
              </div>
              <div className="col-md-2">
                <div className="img-holder">
                  <img className="findDoc" src="images/ent.png" alt="" />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4">ENT Specialist</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="text-center mb-4 ">
            <h3 className="text-center mb-5 mt-2 pb-2 text-primary fw-bold">
              Top Searched Diseases
            </h3>
          </div>
          <div className="row justify-content-center">
            <div className="row mt-2 text-center text-dark">
              <div className="col-md-2">
                <div className="img-holder">
                  <img className="findDoc" src="images/chlorea.jpeg" alt="" />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4"> Cholera</h5>
                </div>
              </div>
              <div className="col-md-2 ">
                <div className="img-holder ">
                  <img className="findDoc" src="images/diabetes.jpeg" alt="" />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4"> Diabetes</h5>
                </div>
              </div>
              <div className="col-md-2">
                <div className="img-holder">
                  <img className="findDoc" src="images/migraine.jpeg" alt="" />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4">Migraine</h5>
                </div>
              </div>
              <div className="col-md-2">
                <div className="img-holder">
                  <img className="findDoc" src="images/hernia.jpeg" alt="" />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4"> Hernia</h5>
                </div>
              </div>
              <div className="col-md-2">
                <div className="img-holder">
                  <img className="findDoc" src="images/pcos.jpeg" alt="" />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4"> PCOS</h5>
                </div>
              </div>
              <div className="col-md-2">
                <div className="img-holder">
                  <img className="findDoc" src="images/corona.jpeg" alt="" />
                </div>
                <div>
                  <h5 className="font-weight-bold mt-4">Covid 19</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="featuresText">
          <h1> How it Works</h1>
        </div>

        <div className="container">
          <div className="features row featuresDiv">
            <div className="featuresdiv col-md-6">
              <h1>Choose from our list of specialists</h1>
              <h4>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
                fugit amet rerum veniam ducimus doloribus, in tempore
                accusantium necessitatibus architecto reprehenderit nostrum
                inventore. Illum quo dolorem distinctio, totam ipsa commodi!
              </h4>
            </div>
            <div className="col-md-6">
              <img
                className="doctorImage rounded-circle"
                src="https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="features row">
            <div className="col-md-6">
              <img
                className="doctorImage rounded-circle"
                src="https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg"
                alt=""
              />
            </div>
            <div className="featuresdiv col-md-6">
              <h1>Pick up from our list of verified doctors</h1>
              <h4>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, suscipit molestias aliquid blanditiis quisquam vel
                accusantium est, sed dignissimos praesentium libero tempora
                voluptate. Reprehenderit doloremque nesciunt explicabo modi
                voluptas illum!
              </h4>
            </div>
          </div>
          <div className="features row featuresDiv">
            <div className="featuresdiv col-md-6">
              <h1>Begin your consultation</h1>
              <h4>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas totam harum dolore, eveniet facilis adipisci beatae
                earum porro blanditiis ad culpa distinctio sapiente sequi ipsum
                laudantium corporis magni omnis at!
              </h4>
            </div>
            <div className="col-md-6">
              <img
                className="doctorImage rounded-circle "
                src="https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
