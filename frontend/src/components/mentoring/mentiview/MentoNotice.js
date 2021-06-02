import { Link } from "react-router-dom";

import MentoContentList from "./MentoContentList";
import "../../../styles/MentoNotice.css";

const MentoNotice = () => {
  const userArray = window.location.href.split("/");
  const username = userArray[userArray.length - 2];

  return (
    <div className="mentiview__detail">
      <div className="mentiview__mentonotice">
        <div className="notice__titledetail">
          <p>공지사항</p>
        </div>
        <MentoContentList page="notice" username={username} />
      </div>
      <Link to="/mentoring/mentiview/writing">
        <button className="mentiview__detailbutton">글 작성</button>
      </Link>
    </div>
  );
};
export default MentoNotice;
