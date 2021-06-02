import React from "react";
import MentoContentList from "./MentoContentList";
import PlusButton from "../../PlusButton";
import "../../../styles/MentoNotice.css";

const MentoNoticeBox = ({ username }) => {
  return (
    <div className="mentiview__mentonoticebox">
      <div className="mentiview__noticetitle">
        <p>공지사항</p>
        <PlusButton path={`/mentoring/mentiview/${username}/notice`} />
      </div>
      <MentoContentList page="notice" username={username} />
    </div>
  );
};

export default MentoNoticeBox;
