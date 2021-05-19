import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/LoginRegisterButton.css";

export default function LoginButton() {
  return (
    <Link className="login_register__button_link" to="/auth/login">
      <button className="login_register__button">Login</button>
    </Link>
  );
}
