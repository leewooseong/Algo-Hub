import React from "react";
import MentoContentList from "./MentoContentList";
import PlusButton from "../../PlusButton";
import "../../../styles/MentoCuration.css";

const MentoCurationBox = ({ username, contentData }) => {
  return (
    <div className="mentiview__mentocurationbox">
      <div className="mentiview__curationtitle">
        <p>큐레이션</p>
        <PlusButton path={`/mentoring/mentiview/${username}/detail/curation`} />
      </div>
      <MentoContentList
        page="curation"
        username={username}
        contentData={contentData}
        detail={false}
      />
    </div>
  );
};

export default MentoCurationBox;
