import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../../pages/Home/Home";
import AboutUs from "../../pages/About/AboutUs";
import Footer from "../Footer/Footer";

export default function Header() {
  return (
    <>
      <NavBar />
      <Route exact path={["/", "/home"]} component={Home} />
      <Route exact path='/about' component={AboutUs} />
      <Footer />
    </>
  );
}
