import React from "react";
import MentoContentList from "./MentoContentList";
import "../../../styles/MentoNoticeBox.css";

const MentoNoticeBox = ({ contentData }) => {
  console.log(contentData);
  return (
    <div className="mentiview__mentonoticebox">
      <div className="mentiview__noticetitle">
        <p>공지사항</p>
      </div>
      <MentoContentList contentData={contentData} />
    </div>
  );
};

export default MentoNoticeBox;
