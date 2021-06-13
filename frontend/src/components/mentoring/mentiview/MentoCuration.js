import { Link } from "react-router-dom";
import MentoContentList from "./MentoContentList";
import useCertificate from "../../../use/useCertificate";
import useAxios from "../../../use/useAxios";
import "../../../styles/MentoCuration.css";

const MentoCuration = () => {
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
      <div className="mentiview__mentocuration">
        <div className="curation__titledetail">
          <p>큐레이션</p>
        </div>
        {mentiViewData.data && (
          <MentoContentList
            page="curation"
            username={mentorname}
            contentData={mentiViewData.data.data.boardData[2][3]}
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

export default MentoCuration;
