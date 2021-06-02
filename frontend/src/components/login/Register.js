import axios from "axios";
import React, { Component } from "react";

import Modal from "../Modal";

export default class RegisterBody extends Component {
  state = {
    response: {},
    modalOpen: false,
    modalContent: "",
  };

  // Modal 관련 함수
  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModalFale = () => {
    this.setState({ modalOpen: false });
  };
  closeModalSuccess = () => {
    this.setState({ modalOpen: false });
    const { history } = this.props;
    history.push("/auth/login");
  };

  // 회원 추가
  addUser = () => {
    const url = "/api/signup";
    const formData = new FormData(); // 서버로 보낼 데이터

    formData.append("m_email", this.email);
    formData.append("m_pwd", this.password);
    formData.append("m_pwd_", this.confirmPassword);
    formData.append("m_name", this.name);
    formData.append(
      "m_age",
      `${this.year}.${this.month ? this.month : 1}.${this.day ? this.day : 1}`
    );
    formData.append("m_tel", this.phoneNumber);

    // 테스트용
    console.log(this.email);
    console.log(this.password);
    console.log(this.confirmPassword);
    console.log(this.name);
    console.log(this.phoneNumber);

    if (this.password !== this.confirmPassword) {
      this.setState({ modalContent: "비밀번호가 일치하지 않습니다." });
      return axios.post("/api/error", formData);
    }

    // axios 방식 요청 시
    // 회원가입을 하고 응답을 받아야함.
    // Success: res = statusCode: 200, message: Success
    return axios.post(url, formData);

    // 이미지와 같이 파일이 포함된 데이터를 서버로 전송하고자 할 때 웹 표준에 맞는 헤더를 추가해 주어야 한다.
    // multipart/form-data: 전달하는 데이터에 파일이 포함되어 있을 때 설정해야하는 것
    // const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // }
    // return axios.post(url, formData, config);
  };

  // 버튼 눌렀을 시 동작
  handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // const res = this.addUser();

    // using server...
    this.addUser()
      .then((res) => {
        console.log("회원가입 성공", res["data"]);
        this.setState({ response: res["data"] });
      })
      .catch((err) => {
        console.log(err);
      });

    this.openModal();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className="register first fadeIn">Sign Up</h3>
        <div className="fadeIn">
          <label htmlFor="name" className="subtitle">
            닉네임
          </label>
          <br />
          <input
            className="input_text"
            required
            id="name"
            type="text"
            placeholder="닉네임"
            onChange={(e) => (this.name = e.target.value)}
          />
        </div>
        <div className="fadeIn">
          <label htmlFor="email" className="subtitle">
            이메일
          </label>
          <br />
          <input
            className="input_email"
            required
            id="email"
            type="email"
            placeholder="이메일"
            onChange={(e) => (this.email = e.target.value)}
          />
        </div>
        <div className="fadeIn">
          <label htmlFor="password" className="subtitle">
            비밀번호
          </label>
          <br />
          <input
            required
            className="input_password"
            id="password"
            type="password"
            placeholder="비밀번호"
            onChange={(e) => (this.password = e.target.value)}
          />
        </div>
        <div className="fadeIn">
          <label htmlFor="confirmPassword" className="subtitle">
            비밀번호 확인
          </label>
          <br />
          <input
            required
            className="input_password"
            id="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            onChange={(e) => (this.confirmPassword = e.target.value)}
          />
        </div>
        <div className="fadeIn">
          <label htmlFor="year" className="subtitle">
            생년월일
          </label>
          <br />
          <div>
            <div>
              <input
                className="year input_text"
                required
                type="text"
                name="year"
                id="year"
                maxLength="4"
                placeholder="년도"
                onChange={(e) => (this.year = e.target.value)}
              />
              <span>년</span>
            </div>
            <select
              className="select"
              name="month"
              id="month"
              defaultValue="1"
              onChange={(e) => {
                this.month = e.target.value;
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <span>
              <label htmlFor="month">월</label>
            </span>
            <select
              className="select"
              name="day"
              id="day"
              defaultValue="1"
              onChange={(e) => (this.day = e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <span>
              <label htmlFor="day">일</label>
            </span>
          </div>
        </div>

        <div className="fadeIn">
          <label htmlFor="phoneNumber" className="subtitle">
            전화번호
          </label>
          <br />
          <input
            className="input_tel"
            required
            id="phoneNumber"
            type="tel"
            placeholder="010-xxxx-xxxx"
            onChange={(e) => (this.phoneNumber = e.target.value)}
          />
        </div>
        {/* <button>Sign Up</button> */}
        <React.Fragment>
          <button className="fourth">Sign Up</button>
          {this.state.response.statusCode === 200 ? (
            <Modal
              open={this.state.modalOpen}
              close={this.closeModalSuccess}
              header="Create a chat room"
            >
              가입 완료되었습니다.
            </Modal>
          ) : (
            <Modal
              open={this.state.modalOpen}
              close={this.closeModalFale}
              header="Create a chat room"
            >
              {this.state.modalContent}
              <br />
              <br />
              양식을 다시 작성해주세요.
            </Modal>
          )}
        </React.Fragment>
      </form>
    );
  }
}
