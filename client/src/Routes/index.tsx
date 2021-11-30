import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

//components
import Sidebar from "../layout/sidebar";
import Auth from "../authentication";
// import Header from "../layout/Navbar";
import Errors from "../components/404";

const username = localStorage.getItem("username");

export default function AllRoutes() {
  return (
    <Switch>
      {/* <Route exact path={["/", "/home", "/about"]} component={Header} /> */}
      <Route exact path={["/register", "/login"]} component={Auth} />
      {!username ? (
        <Redirect to='/login' />
      ) : (
        <Route path={["/chat", "/music", "/settings"]} component={Sidebar} />
      )}
      <Route path='' component={Errors} />
    </Switch>
  );
}
