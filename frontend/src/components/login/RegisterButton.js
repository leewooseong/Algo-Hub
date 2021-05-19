import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/LoginRegisterButton.css";

export default function RegisterButton() {
  return (
    <Link className="login_register__button_link" to="/auth/register">
      <button className="login_register__button">Register</button>
    </Link>
  );
}
