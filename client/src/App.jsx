import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddToCart from "./Pages/AddToCart/AddToCart";
import Profile from "./Pages/Profile/Profile";
import Header from "./Components/Header/Header";
import Menu from "./Pages/Menu/Menu";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<AddToCart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<div>Checkout</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
