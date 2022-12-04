import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPage from "../../poet-app/src/components/Pages/FrontPage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import ContactPage from "./components/Pages/ContactPage";
import SellerHomePage from "./components/Pages/SellerPages/SellerHomePage";
import SellerAddComponentPage from "./components/Pages/SellerPages/SellerAddComponentPage";
import SellerDeleteComponentPage from "./components/Pages/SellerPages/SellerDeleteComponentPage";
import SellerSubscriberPage from "./components/Pages/SellerPages/SellerSubscriberPage";
import SellerRequestPages from "./components/Pages/SellerPages/SellerRequestPages";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer
        autoClose={1000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <Routes>
        <Route path="/" element={<FrontPage></FrontPage>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage></SignupPage>} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/app/seller/home" element={<SellerHomePage />} />
        <Route path="/app/seller/add" element={<SellerAddComponentPage />} />
        <Route
          path="/app/seller/delete"
          element={<SellerDeleteComponentPage />}
        />
        <Route path="/app/seller/orders" element={<SellerOrdersPage />} />
        <Route path="/poets" element={<PoetCardList />} />
        <Route path="/poetries" element={<PoetryList />} />
        <Route path="poet/poetries" element={<PoetPoetryList />} />
      </Routes>
    </Router>
  );
}

export default App;
