import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import authServices from "./Services/AuthServices";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const [userType, setUserType] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  useEffect(() => {
    if (authServices.getLoggedInUser() != null) {
      var type = authServices.getLoggedInUser().userType;
      setUserType(type);
    } else {
      setUserType("patient");
    }

    setIsLoggedIn(authServices.isLoggedIn());
  }, []);
  return (
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark">
      <div class="container">
        <Link class="navbar-brand" href="#" to="/">
          <h3>Poet Prime</h3>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            {isLoggedIn && userType == "doctor" ? (
              <>
                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/doctorAppointments"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Appointments
                  </li>
                </Link>
                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/patientsDetail"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Patients Record
                  </li>
                </Link>
              </>
            ) : isLoggedIn && userType == "respondant" ? (
              <>
                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/respondantRequests"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Requests
                  </li>
                </Link>

                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/acceptedPatients"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Accepted Patients
                  </li>
                </Link>
              </>
            ) : isLoggedIn && userType == "patient" ? (
              <>
                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/doctors"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Poets
                  </li>
                </Link>

                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/medicines"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Poetries
                  </li>
                </Link>
                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/cart"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    <i class="fa-solid fa-cart-shopping"></i> cart
                  </li>
                </Link>
              </>
            ) : (
              <></>
            )}

            {isLoggedIn ? (
              <>
                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/login"
                  onClick={(e) => {
                    authServices.logout();
                    setIsLoggedIn(false);
                  }}
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Sign out
                  </li>
                </Link>

                <li
                  class=" nav-item nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Hi, <strong>{authServices.getLoggedInUser().username}</strong>
                </li>
              </>
            ) : (
              <>
                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/doctors"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Poets
                  </li>
                </Link>

                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/medicines"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Poetries
                  </li>
                </Link>

                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/login"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Sign in
                  </li>
                </Link>

                <Link
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  to="/signup"
                >
                  <li
                    class="nav-item "
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Sign up
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
