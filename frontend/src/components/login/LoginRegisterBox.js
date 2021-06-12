import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import MentoRequestButton from "../mentoring/MentoRequestButton";
import OutsideClick from "../../use/useOutsideClick";
import axios from "axios";
import "../../styles/LoginRegisterBox.css";
import "../../styles/Reset.css";

export default function LoginRegisterBox({ user, mentorValidation }) {
  // click outside not sidebar
  const boxRef = useRef(null);
  const buttonRef = useRef(null);
  //boxOutsideClick will be true on outside click
  //outside: true
  //inside: false
  const boxOutsideClick = OutsideClick(boxRef);
  const buttonOutsideClick = OutsideClick(buttonRef);

  const [showbox, setShowbox] = useState("disabled");

  const ClickUser = () => {
    if (showbox == "disabled") {
      setShowbox("");
    } else {
      setShowbox("disabled");
    }
  };

  useEffect(() => {
    if (showbox == "" && boxOutsideClick && buttonOutsideClick) {
      setShowbox("disabled");
    }
  }, [buttonOutsideClick, boxOutsideClick]);

  // logout
  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then((res) => {
        alert("로그아웃");
        window.location.href = "/";
      })
      .catch((err) => {
        alert("로그아웃이 정상처리되지 않았습니다.");
      });
  };

  return (
    <>
      {user.loading ? (
        <>
          <div className="logindone__login_box">
            <img
              className="logindone__image"
              src="/assets/profileDefaultImage.png"
            />

            <span className="logindone__name">{user.localUserName}</span>

            <button
              ref={buttonRef}
              className="logindone__meatballbutton"
              onClick={ClickUser}
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <div
            ref={boxRef}
            className={classNames("logindone__dropdownmenu_right", showbox)}
          >
            <button
              className={classNames(
                "logindone__dropdownmenu_list",
                "logindone__logoutbutton"
              )}
              onClick={handleLogout}
            >
              로그아웃
            </button>
            <Link to="#" className={classNames("logindone__dropdownmenu_list")}>
              회원정보
            </Link>
            <MentoRequestButton
              m_name={user.localUserName}
              mentorValidation={mentorValidation}
            />
          </div>
        </>
      ) : (
        <div className="login__login_box">
          <LoginButton className="login_register__button" />
          <RegisterButton className="login_register__button" />
        </div>
      )}
    </>
  );
}
