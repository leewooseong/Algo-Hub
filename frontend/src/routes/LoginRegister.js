import React, { Component } from "react";
import "../styles/LoginRegister.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginRegisterHeader from "../components/login/LoginRegisterHeader";
import Login from "../components/login/Login";
import Register from "../components/login/Register";

export default class LoginRegister extends Component {
  render() {
    return (
      <div className="login_container">
        <LoginRegisterHeader />
        <BrowserRouter>
          <Switch>
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
