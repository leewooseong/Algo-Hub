import React from "react";
import MentoContentList from "./MentoContentList";
import PlusButton from "../../PlusButton";
import "../../../styles/MentoCuration.css";

const MentoCurationBox = ({ username }) => {
  return (
    <div className="mentiview__mentocurationbox">
      <div className="mentiview__curationtitle">
        <p>큐레이션</p>
        <PlusButton path={`/mentoring/mentiview/${username}/curation`} />
      </div>
      <MentoContentList page="curation" username={username} />
    </div>
  );
};

export default MentoCurationBox;
