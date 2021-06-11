import React from "react";
import { Link } from "react-router-dom";
import "../../styles/LoginRegisterButton.css";

export default function LoginButton() {
  return (
    <Link className="login_register__button_link" to="/auth/login">
      <div className="login_register__buttonhover">
        <button className="login_register__button">로그인</button>
      </div>
    </Link>
  );
}
