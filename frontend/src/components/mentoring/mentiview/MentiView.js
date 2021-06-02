import React from "react";
import useAxios from "../../../use/useAxios";
import MentoInfoBox from "./MentoInfoBox";
import MentoReviewBox from "./MentoReviewBox";
import MentoNoticeBox from "./MentoNoticeBox";
import MentoCurriculumBox from "./MentoCurriculumBox";
import MentoCurationBox from "./MentoCurationBox";
import "../../../styles/MentiView.css";

const MentiView = () => {
  const userArray = window.location.href.split("/");
  const username = userArray[userArray.length - 1];
  const mentoInfoData = useAxios({ url: `/api/mentors/${username}` });
  const mentiViewData = useAxios({ url: `/api/mentor-room/${username}` });



  return (
    <main className="main__section">
      <div className="mentoring__menitview">
        {mentoInfoData.data && (
          <div className="mentoring__mentiviewleft">
            <MentoInfoBox
              // mentoInfoData.data.data.mentor
              m_name={mentoInfoData.data.data.mentor.m_name}
              m_p_image="/assets/profileDefaultImage.png"
              m_c_number={mentoInfoData.data.data.mentor.m_c_number}
              m_p_intro={mentoInfoData.data.data.mentor.m_p_intro}
              post_number={mentoInfoData.data.data.mentor.post_number}
              cm_number={mentoInfoData.data.data.mentor.cm_number}
            />
            <MentoReviewBox
              m_name={mentoInfoData.data.data.mentor.mr_score}
              mr_score={mentoInfoData.data.data.mentor.mr_score}
            />
          </div>
        )}
        {/* <MentoCurriculumBox contentData={mentiViewData.data.data.boardData[2][3]} /> */}
        {!mentiViewData.loading && (
          // console.log(mentiViewData.data.data.boardData[2][3])
          <div className="mentoring__mentiviewright">
            <MentoNoticeBox username={username} />
            <MentoCurriculumBox username={username} />
            <MentoCurationBox username={username} />
          </div>
        )}
      </div>
    </main>
  );
};

export default MentiView;
