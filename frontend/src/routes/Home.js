import React from "react";
import Header from "../components/layout/Header";
import LoginRegisterBox from "../components/login/LoginRegisterBox";
import "../styles/Home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <LoginRegisterBox />
      </div>
    );
  }
}

export default Home;
