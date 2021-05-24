import React, { Component, useState, useEffect } from "react";
import useAxios from "../../../use/useAxios";
import MentoInfoBox from "./MentoInfoBox";
import MentoReviewBox from "./MentoReviewBox";
import MentoNoticeBox from "./MentoNoticeBox";
import MentoCurriculumBox from "./MentoCurriculumBox";
import "../../../styles/MentiView.css";
import MentorMentiInfo from "../mentomenti/MentoMentiInfo";
import MentorWriting from '../mentomenti/MentorWriting'
import { Link } from 'react-router-dom'

const MentiView = (props) => {
  const username = props.location.state.m_name
  const mentoInfoData = useAxios({ url: `/api/mentors/${username}` });
  const mentiViewData = useAxios({ url: `/api/mentor-room/${username}` });
  return (
    <div className="mentoring__menitview">
      {/* m_name으로 수정 필요 */}
      {mentoInfoData.data &&
        <MentoInfoBox
          // mentoInfoData.data.data.mentor
          m_name={mentoInfoData.data.data.mentor.m_name}
          m_p_image="/assets/profileDefaultImage.png"
          m_c_number={mentoInfoData.data.data.mentor.m_c_number}
          m_p_intro={mentoInfoData.data.data.mentor.m_p_intro}
          post_number={mentoInfoData.data.data.mentor.post_number}
          cm_number={mentoInfoData.data.data.mentor.cm_number}
        />
      }
      {/* <MentoReviewBox mr_score={mentoInfoData.data.mr_score} /> */}
      {/* <MentoCurriculumBox contentData={mentiViewData.data.data.boardData[2][3]} /> */}
      {!mentiViewData.loading &&
        // console.log(mentiViewData.data.data.boardData[2][3])
        <>
          <MentoNoticeBox contentData={mentiViewData.data.data.boardData[2][3]} />
          <MentoCurriculumBox contentData={mentiViewData.data.data.boardData[2][3]} />
          <Link to="/mentoring/mentiview/writing">
            <button>글 작성</button>
          </Link>
        </>
      }



    </div >
  );
};

export default MentiView;
