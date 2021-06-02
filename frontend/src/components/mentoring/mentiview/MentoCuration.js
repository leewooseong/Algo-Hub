import { Link } from "react-router-dom";
import MentoContentList from "./MentoContentList";
import "../../../styles/MentoCuration.css";

const MentoCuration = () => {
  const userArray = window.location.href.split("/");
  const username = userArray[userArray.length - 2];

  return (
    <div className="mentiview__detail">
      <div className="mentiview__mentocuration">
        <div className="curation__titledetail">
          <p>큐레이션</p>
        </div>
        <MentoContentList page="curation" username={username} />
      </div>
      <button className="mentiview__detailbutton">
        <Link to="/mentoring/mentiview/writing">글 작성</Link>
      </button>
    </div>
  );
};

export default MentoCuration;
