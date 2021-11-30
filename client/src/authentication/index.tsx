import React from "react";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "../assets/logo/Praline.svg";

function Auth() {
  return (
    <>
      <div className='w-full h-screen bg-primary-500 text-white flex flex-col justify-center self-center relative'>
        <nav
          className='inline-flex text-2xl h-12 p-5 font-medium
        sm:self-center sm:p-2
        '
        >
          <img src={logo} alt='Company logo' className='w-10 h-10 mx-2' />
          <p className='font-notable tracking-widest'>PRALINE</p>
        </nav>
        <main className='flex justify-center items-center w-full h-full text-center'>
          <Router>
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
            </Switch>
          </Router>
        </main>
      </div>
    </>
  );
}

export default Auth;
