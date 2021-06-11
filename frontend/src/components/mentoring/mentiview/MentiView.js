import {
  useState,
  useCallback,
  useEffect,
  useReducer,
  createContext,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxios from "../../../use/useAxios";
import useCertificate from "../../../use/useCertificate";
import MentoInfoBox from "./MentoInfoBox";
import MentoReviewBox from "./MentoReviewBox";
import MentoNoticeBox from "./MentoNoticeBox";
import MentoCurriculumBox from "./MentoCurriculumBox";
import MentoCurationBox from "./MentoCurationBox";
import Modal from "../../Modal";
import "../../../styles/MentiView.css";

const MentiView = () => {
  // 유효성 검증 및 api 요청을 위한 변수
  const userArray = window.location.href.split("/");
  const mentorname = userArray[5];
  let mentorvalidation;

  // 유효성 검증(지금 사용자가 멘토인지 멘티인지 구분하기 위함)
  const user = useCertificate();
  const username = user.localUserName;
  const userid = user.localUserId;

  if (mentorname == username) {
    mentorvalidation = true;
    console.log("mentorvalidation", mentorvalidation);
  } else {
    mentorvalidation = false;
    console.log("mentorvalidation", mentorvalidation);
  }

  // api 요청
  const mentoInfoData = useAxios({ url: `/api/mentors/${mentorname}` });
  const mentoBoardData = useAxios({ url: `/api/mentor-room/${mentorname}` });
  const mentoReviewData = useAxios({
    url: `/api/mentors/${mentorname}/review`,
  });

  // api 데이터 확인
  {
    mentoBoardData.data &&
      console.log("mentoBoardData", mentoBoardData.data.data.boardData);
    mentoInfoData.data && console.log("mentoInfoData", mentoInfoData.data.data);
    mentoReviewData.data &&
      console.log("mentoReviewData", mentoReviewData.data.data);
  }

  return (
    <main className="main__section">
      <div className="mentoring__menitview">
        {mentoInfoData.data && (
          <div className="mentoring__mentiviewleft">
            {userid && (
              <MentoInfoBox
                m_name={mentoInfoData.data.data.mentor.m_name}
                m_p_image="/assets/profileDefaultImage.png"
                m_c_number={mentoInfoData.data.data.mentor.m_c_number}
                m_p_intro={mentoInfoData.data.data.mentor.m_p_intro}
                post_number={mentoInfoData.data.data.mentor.post_number}
                cm_number={mentoInfoData.data.data.mentor.cm_number}
                mentorvalidation={mentorvalidation}
                userCertificate={user}
                reviewData={mentoReviewData}
              />
            )}
            <MentoReviewBox
              m_name={mentoInfoData.data.data.mentor.m_name}
              mr_score={mentoInfoData.data.data.mentor.mr_score}
              userid={userid}
            />
          </div>
        )}
        {!mentoBoardData.loading && (
          // console.log(mentiViewData.data.data.boardData[2][3])
          <div className="mentoring__mentiviewright">
            <MentoNoticeBox
              username={mentorname}
              contentData={mentoBoardData.data.data.boardData[0][1]}
            />
            <MentoCurriculumBox
              username={mentorname}
              contentData={mentoBoardData.data.data.boardData[1][2]}
            />
            <MentoCurationBox
              username={mentorname}
              contentData={mentoBoardData.data.data.boardData[2][3]}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default MentiView;
