import React from "react";
import { Route, Switch } from "react-router-dom";
// import { BrowserRouter as Route, Switch } from "react-router-dom";

//components
import Sidebar from "./components/sidebar";
import Auth from "./authentication";
import Header from "./components/Navbar";
import Errors from "./404";

// import NavBar from "./components/Navbar/NavBar";

function App() {
  return (
    <>
      <Switch>
        <Route exact path={["/", "/home", "/about"]} component={Header} />

        <Route exact path={["/register", "/login"]} component={Auth} />
        <Route path={["/chat", "/music", "/settings"]} component={Sidebar} />

        <Route path='' component={Errors} />
      </Switch>
    </>
  );
}

export default App;
