import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import authServices from "./Services/AuthServices";

const key =
  "pk_test_51KuvSGJ5s3GMFY7xlZh5LhxrdAGBfMyV3nFZ0EK8WzhxtLWUCpqM20izoZyCNj7NhoTKNfsR3ZBv9ASdsnbYRlyy00uoK5gUmJ";

const payment = () => {
  const location = useLocation();
  const [amount, setAmount] = React.useState(
    location.state.amount ? location.state.amount : 20
  );
  const [doctorId, setDoctorId] = React.useState(
    location.state.doctorId ? location.state.doctorId : ""
  );
  const [data, setData] = React.useState(
    location.state.data ? location.state.data : {}
  );
  const [stripeToken, setStripeToken] = React.useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      console.log(doctorId);
      try {
        const res = await axios.post(
          "https://ar-medicare-backend.herokuapp.com/api/patient/request/doctor/" +
            authServices.getLoggedInUser()._id,
          {
            tokenId: stripeToken.id,
            amount,
            doctorId,
            data,
          }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [stripeToken]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StripeCheckout
        name="ARMedicare"
        image="images/nurseLogo.jpg"
        billingAddress
        shippingAddress
        description
        amount={amount}
        token={onToken}
        stripeKey={key}
      >
        <button class="btn btn-primary signIn-btn mb-5 " id="payment-btn">
          Pay
        </button>
      </StripeCheckout>
    </div>
  );
};

export default payment;
