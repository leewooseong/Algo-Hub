import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginRegisterBox from "../login/LoginRegisterBox";
import useAxios from "../../use/useAxios";
import axios from "axios";
import "../../styles/Header.css";

function Header({ user }) {
  // 멘토인지 여부를 확인하여 MentoRequest 버튼에 표시하기 위함
  const [mentorValidation, setMentorValidation] = useState(false);

  useEffect(() => {
    if (user.loading) {
      const fetchData = async () => {
        const result = await axios.get("/api/mentors");
        const mentorList = result.data.mentorList;
        if (result.data.mentorList) {
          let num = result.data.mentorList.length;
          for (let i = 0; i < num; i++) {
            if (mentorList[i]["m_name"] == user.localUserName) {
              setMentorValidation(true);
              break;
            }
          }
        }
      };
      fetchData();
    }
  }, [user.loading]);

  return (
    <header className="App__header">
      <div className="App__Logo">
        <Link to="/">
          <span className="blind">Logo</span>
          <img src={"/assets/logo.png"} />
        </Link>
      </div>
      <nav className="App__nav">
        <ul className="nav__container">
          <Link to="/category">
            <li className="nav__item">
              <i className="fas fa-key" />
              알고리즘
            </li>
          </Link>
          <Link to="/mentoring">
            <li className="nav__item">
              <i className="fas fa-user-friends"></i>멘토/멘티
            </li>
          </Link>
          <Link to="/rank">
            <li className="nav__item">
              <i className="fas fa-medal"></i>랭킹
            </li>
          </Link>
          <Link to="/board">
            <li className="nav__item">
              <i className="fas fa-edit"></i>게시판
            </li>
          </Link>
        </ul>
      </nav>
      <LoginRegisterBox user={user} mentorValidation={mentorValidation} />
    </header>
  );
}

export default Header;
