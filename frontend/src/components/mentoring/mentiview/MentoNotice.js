import { Link } from "react-router-dom";
import useAxios from "../../../use/useAxios";
import useCertificate from "../../../use/useCertificate";
import MentoContentList from "./MentoContentList";
import "../../../styles/MentoNotice.css";

const MentoNotice = () => {
  const userArray = window.location.href.split("/");
  const mentorname = userArray[5];
  const username = useCertificate().localUserName;
  let mentorvalidation;

  // 멘토 유효성 검사
  if (mentorname == username) {
    mentorvalidation = true;
    console.log("mentorvalidation", mentorname, username);
  } else {
    mentorvalidation = false;
    console.log("mentorvalidation", mentorname, username);
  }

  // 상세 페이지 게시물 정보 받아오기
  const mentiViewData = useAxios({ url: `/api/mentor-room/${mentorname}` });

  return (
    <div className="mentiview__detail">
      <div className="mentiview__mentonotice">
        <div className="notice__titledetail">
          <p>공지사항</p>
        </div>
        {mentiViewData.data && (
          <MentoContentList
            page="notice"
            username={mentorname}
            contentData={mentiViewData.data.data.boardData[0][1]}
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
export default MentoNotice;
