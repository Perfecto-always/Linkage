import React from "react";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Auth() {
  return (
    <div className='form-full-page-container'>
      <div className='form-container'>
        <div className=' form-side-container gradient'>Hello world</div>
        <div className='form-main-container'>
          <Router>
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default Auth;
