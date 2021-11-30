import React from "react";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Auth() {
  return (
    <div className='w-full h-screen bg-primary-500 text-white flex justify-center self-center relative'>
      <main className='flex justify-center items-center w-full h-full text-center'>
        <Router>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default Auth;
