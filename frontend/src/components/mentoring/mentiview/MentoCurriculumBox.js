import React from "react";
import MentoContentList from "./MentoContentList";
import PlusButton from "../../PlusButton";
import "../../../styles/MentoCurriculum.css";

const MentoCurriculumBox = ({ username, contentData }) => {
  return (
    <div className="mentiview__mentocurriculumbox">
      <div className="mentiview__curriculumtitle">
        <p>커리큘럼</p>
        <PlusButton
          path={`/mentoring/mentiview/${username}/detail/curriculum`}
        />
      </div>
      <MentoContentList
        page="curriculum"
        username={username}
        contentData={contentData}
        detail={false}
      />
    </div>
  );
};

export default MentoCurriculumBox;
