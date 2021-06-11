import React from "react";
import { Link } from "react-router-dom";
import "../../styles/LoginRegisterButton.css";

export default function RegisterButton() {
  return (
    <Link className="login_register__button_link" to="/auth/register">
      <div className="login_register__buttonhover">
        <button className="login_register__button">회원가입</button>
      </div>
    </Link>
  );
}
