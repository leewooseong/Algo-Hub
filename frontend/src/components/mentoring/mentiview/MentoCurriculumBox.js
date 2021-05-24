import React from "react";
import MentoContentList from "./MentoContentList";
import "../../../styles/MentoCurriculumBox.css";

const MentoCurriculumBox = ({ contentData }) => {
  return (
    <div className="mentiview__mentocurriculumbox">
      <div className="mentiview__curriculumtitle">
        <p>커리큘럼</p>
      </div>
      <MentoContentList contentData={contentData} />
    </div>
  );
};

export default MentoCurriculumBox;
