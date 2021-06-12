import axios from "axios";
import React, { useEffect, useState } from "react";
import useChangeButton from "../../use/useChangeButton";
import useShowButton from "../../use/useShowButton";
import "../../styles/MentoRequestButton.css";
import classnames from "classnames";

const MentoRequestButton = ({ m_name, mentorValidation }) => {
  const [initialState, setInitialState] = useState("");
  const [initialClassName, setInitialClassName] = useState("__notallow");

  const ClickMentoAllow = () => {
    if (buttonInfo.text === "멘토 신청") {
      axios
        .put(`/api/mentor-request`)
        .then((res) => {
          if (res.data.statusCode === 200) {
            buttonInfo.setText("멘토");
            alert("멘토 등록이 성공!");
          } else {
            alert("멘토 등록 실패");
          }
        })
        .catch((err) => {
          console.log("오류 발생", err);
        });

      buttonInfo.setText("멘토");
    } else if (buttonInfo.text === "멘토") {
      window.location.href = `/mentoring/mentiview/${m_name}`;
    }
  };

  // 초기 상태
  useEffect(() => {
    if (mentorValidation) {
      setInitialState("멘토");
      setInitialClassName("__allow");
    } else {
      setInitialState("멘토 신청");
      setInitialClassName("__notallow");
    }
  }, [mentorValidation]);

  const buttonInfo = useChangeButton(initialState, initialClassName);

  useEffect(() => {
    console.log("initialState is changed", initialState, buttonInfo.text);
    buttonInfo.setText(initialState);
  }, [initialState]);

  return (
    <button
      className={classnames(
        "logindone__dropdownmenu_list",
        "logindone__logoutbutton"
      )}
      onClick={() => {
        ClickMentoAllow();
      }}
    >
      {buttonInfo.text}
    </button>
  );
};

export default MentoRequestButton;
