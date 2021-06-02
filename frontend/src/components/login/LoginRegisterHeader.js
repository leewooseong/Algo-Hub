import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/LoginRegisterHeader.css";

export default class LoginHeader extends Component {
  render() {
    return (
      <Link to="/">
        <span className="title fadeIn">algohub</span>
      </Link>
    );
  }
}
