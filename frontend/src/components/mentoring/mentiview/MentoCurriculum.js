import { Link } from "react-router-dom";
import MentoContentList from "./MentoContentList";
import useCertificate from "../../../use/useCertificate";
import useAxios from "../../../use/useAxios";
import "../../../styles/MentoCurriculum.css";

const MentoCurriculum = () => {
  const userArray = window.location.href.split("/");
  const mentorname = userArray[5];
  const username = useCertificate().localUserName;
  let mentorvalidation;

  // 멘토 유효성 검사
  if (username == mentorname) {
    mentorvalidation = true;
  } else {
    mentorvalidation = false;
  }

  // 상세 페이지 게시물 정보 받아오기
  const mentiViewData = useAxios({ url: `/api/mentor-room/${mentorname}` });

  return (
    <div className="mentiview__detail">
      <div className="mentiview__mentocurriculum">
        <div className="curriculum__titledetail">
          <p>커리큘럼</p>
        </div>
        {mentiViewData.data && (
          <MentoContentList
            page="curriculum"
            username={mentorname}
            contentData={mentiViewData.data.data.boardData[1][2]}
            detail={true}
            mentorvalidation={mentorvalidation}
          />
        )}
      </div>
      {mentorvalidation ? (
        <div className="mentiview__detailbuttonbox">
          <Link to="/mentoring/mentiview/writing/mentor/board">
            <button className="mentiview__detailbutton">글 작성</button>
          </Link>
          <Link to={`/mentoring/mentiview/${mentorname}`}>
            <button className="mentiview__detailbutton">돌아가기</button>
          </Link>
        </div>
      ) : (
        <Link to={`/mentoring/mentiview/${mentorname}`}>
          <button className="mentiview__detailbutton">돌아가기</button>
        </Link>
      )}
    </div>
  );
};
export default MentoCurriculum;
