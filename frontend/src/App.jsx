import React from "react";
import {Routes, Route } from "react-router-dom";
import Home from "./components/Hero/Hero.jsx";
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import AboutPage from "./components/Pages/About.jsx";
import ContactPage from "./components/Pages/Contact.jsx";
import CartPage from "./components/Cart/CartPage.jsx";
import CheckoutPage from "./components/Cart/CheckoutPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";


export default function App() {
  return (
    <>
      <ScrollToTop /> 
      <Navbar />
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </>
  );
}
