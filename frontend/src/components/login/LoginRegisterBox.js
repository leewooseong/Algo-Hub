import React from "react";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import "../../styles/LoginRegisterBox.css";
import "../../styles/Reset.css";

class Home extends React.Component {
  render() {
    return (
      <div className="login__login_box">
        <LoginButton className="login_register__button" />
        <RegisterButton className="login_register__button" />
      </div>
    );
  }
}

export default Home;
