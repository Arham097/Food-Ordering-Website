import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddToCart from "./Pages/AddToCart/AddToCart";
import Profile from "./Pages/Profile/Profile";
import Header from "./Components/Header/Header";
import Menu from "./Pages/Menu/Menu";
import Checkout from "./Pages/Checkout/Checkout";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<AddToCart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
