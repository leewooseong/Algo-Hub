import axios from "axios";
import React, { Component } from "react";
// import "../../styles/.css";

export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      m_email: this.email,
      m_pwd: this.password,
    };

    // console.log(data.m_email, data.m_pwd);
    const formData = new FormData();
    formData.append("m_email", this.email);
    formData.append("m_pwd", this.password);

    axios
      .post("/api/auth/login", formData)
      .then((res) => {
        console.log("로그인 성공", res);
        // 로그인 성공 시 아래의 작업 수행
        // console.log(this.props);
        // const { history } = this.props;
        // history.push("/");
        // window.location.reload();
      })
      .catch((err) => {
        console.log("로그인 실패", err);
        // window.location.reload();
      });

    // dummy data...
    // const res = {
    //   statusCode: 200,
    //   message: "Success",
    //   data: "abcdefghijklmnopqrstuvwxyz",
    // };

    // 로그인 성공 시 아래의 작업 수행
    // console.log(this.props);
    // const { history } = this.props;
    // history.push("/");
    // window.location.reload();
    // 이후 axios를 이용해 header에 token 추가...
  };

  render() {
    return (
      // <div class="wrapper fadeInDown">
      <div className="wrapper">
        <div id="formContent">
          <form onSubmit={this.handleSubmit}>
            <h3 className="login fadeIn first">Login</h3>
            {/* <h2>
              you are in <span>Login</span> page.
            </h2> */}
            {/* <h3 className="first">Login</h3> */}

            <input
              required
              className="login fadeIn second input_email"
              // className="second"
              id="login"
              type="email"
              placeholder="아이디를 입력하세요(이메일)"
              onChange={(e) => (this.email = e.target.value)}
            />

            <input
              required
              className="fadeIn third input_password"
              // className="third"
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => (this.password = e.target.value)}
            />

            <button className="fadeIn fourth ">Login</button>
            {/* <button className="fourth">Login</button> */}
          </form>
        </div>
      </div>
    );
  }
}