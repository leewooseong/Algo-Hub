import { Link } from "react-router-dom";
import MentoContentList from "./MentoContentList";
import "../../../styles/MentoCurriculum.css";

const MentoCurriculum = () => {
  const userArray = window.location.href.split("/");
  const username = userArray[userArray.length - 2];

  return (
    <div className="mentiview__detail">
      <div className="mentiview__mentocurriculum">
        <div className="curriculum__titledetail">
          <p>커리큘럼</p>
        </div>
        <MentoContentList page="curriculum" username={username} />
      </div>
      <button className="mentiview__detailbutton">
        <Link to="/mentoring/mentiview/writing">글 작성</Link>
      </button>
    </div>
  );
};
export default MentoCurriculum;
