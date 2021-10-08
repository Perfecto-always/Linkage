import React from "react";
import { BrowserRouter as Switch, Route, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../../pages/Home/Home";
import AboutUs from "../../pages/About/AboutUs";
import Footer from "../Footer/Footer";
import { AnimatePresence } from "framer-motion";

export default function Header() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <AnimatePresence initial={false} exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path='/about' component={AboutUs} />
        </Switch>
      </AnimatePresence>
      <Footer />
    </>
  );
}
