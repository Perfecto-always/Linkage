import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register().then(function (registration) {
  if ("sync" in registration) {
    const form = document.querySelector("#chatInput");
    const messageBody = form.querySelector("#messageBody");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const message = {
        body: messageBody.value,
      };
      store
        .outbox("readwrite")
        .then(function (outbox) {
          return outbox.put(message);
        })
        .then(function () {
          messageBody.value = "";
          return registration.sync.register("outbox");
        })
        .catch(function (err) {
          // something went wrong with the database or the sync registration, log and submit the form
          console.error(err);
          // form.submit((e) => e.preventDefault());
        });
    });
  }
});
