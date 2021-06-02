import axios from "axios";
import React, { Component } from "react";
import $ from "jquery";
import { } from "jquery.cookie";
// import "../../styles/.css";

export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("m_email", this.email);
    formData.append("m_pwd", this.password);

    const config = {
      headers: {
        "content-type": "application/json",
        withCredentials: true,
      },
    };

    // $.removeCookie("JSESSIONID", { path: "/" });
    axios
      .post("/api/auth/login", formData, config)
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert("로그인 성공");
          // 로그인이 됐을 때 쿠키 값을 셋팅하고 성공 메세지 출력
          // login_id라는 키값에 받아온 데이터(id)를 셋팅
          // console.log(res);
          // alert(res.headers["set-cookie"]);
          // alert(res.data.message);
          // 로그인 성공 시 아래의 작업 수행
          // const { history } = this.props;
          // history.push("/");
          // window.location.reload();
          console.log($.cookie("JSESSIONID"));
        } else {
          alert("로그인 실패");
        }
      })
      .catch((err) => {
        console.log("로그인 실패", err);
        // window.location.reload();
      });
    // axios.get("/api/logout");
    // dummy data...
    // const res = {
    //   statusCode: 200,
    //   message: "Success",
    //   data: "abcdefghijklmnopqrstuvwxyz",
    // };
  };

  componentDidMount() {
    console.log("쿠키: ", $.cookie("JSESSIONID"));
  }

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
