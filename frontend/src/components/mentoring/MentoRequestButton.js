import axios from "axios";
import React, { Component, useState } from "react";
import useChangeButton from "../../use/useChangeButton";
import useShowButton from "../../use/useShowButton";
import "../../styles/MentoRequestButton.css";
import classnames from "classnames";

const MentoRequestButton = ({ m_name }) => {
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
      alert("멘토 등록 성공");
    }
  };

  const buttonInfo = useChangeButton("멘토 신청", "__notallow");
  const buttonShow = useShowButton();
  console.log(buttonShow);

  return (
    <button
      className={classnames(
        "mentorequestbutton" + buttonInfo.className,
        buttonShow.showClass
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
