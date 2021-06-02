import React from "react";
import MentoContentList from "./MentoContentList";
import PlusButton from "../../PlusButton";
import "../../../styles/MentoCurriculum.css";

const MentoCurriculumBox = ({ username }) => {
  return (
    <div className="mentiview__mentocurriculumbox">
      <div className="mentiview__curriculumtitle">
        <p>커리큘럼</p>
        <PlusButton path={`/mentoring/mentiview/${username}/curriculum`} />
      </div>
      <MentoContentList page="curriculum" username={username} />
    </div>
  );
};

export default MentoCurriculumBox;
