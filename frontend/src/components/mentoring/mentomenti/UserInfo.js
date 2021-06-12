import "../../../styles/UserInfo.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import useConfirm from "../../../use/useConfirm";
import useChangeButton from "../../../use/useChangeButton";
import useCertificate from "../../../use/useCertificate";

export default function UserInfo({
  m_id,
  m_name,
  m_p_intro,
  m_c_number,
  mr_score,
  post_number,
  cm_number,
}) {
  const userCertificate = useCertificate();

  // 구독 여부 알아오는 변수
  const [initialState, setInitialState] = useState("");
  const [initialClassName, setInitialClassName] = useState("__disabled");
  // 리뷰 데이터
  const [reviewData, setReviewData] = useState(null);

  //초기에 페이지 로딩 시 userid를 받아왔다면 현재 사용자의 구독정보를 알아온다.
  useEffect(() => {
    console.log("certificate working", userCertificate);
    if (userCertificate.loading) {
      // 구독 정보
      const fetchData = async () => {
        const result = await axios.get(
          `/api/subscription-info/user/${userCertificate.localUserId}`
        );
        console.log(userCertificate.localUserId);
        console.log(result);
        // 비동기로 받아온 데이터를 이용해서 초기상태 지정
        if (result.data.SubscriptionList.includes(m_name)) {
          console.log("includes name!");
          setInitialState("Following");
          setInitialClassName("__followingbutton");
        } else {
          console.log("not includes name;");
          setInitialState("Follow");
          setInitialClassName("__followbutton");
        }
      };
      fetchData();
      // 구독 정보를 이용하여 해당 멘토에 대해 구독 중인지 판별
    }
  }, [userCertificate.loading]);

  const buttonInfo = useChangeButton(initialState, initialClassName);

  useEffect(() => {
    console.log("initialState is changed", initialState, buttonInfo.text);
    buttonInfo.setText(initialState);
  }, [initialState]);

  return (
    <>
      <Link to={`/mentoring/mentiview/${m_name}`}>
        <div className="mentorinfo__container">
          <div className="profile__image">
            <img
              className="mentor__image"
              src="/assets/profileDefaultImage.png"
              alt="profileImage"
            />
            <span className="mentor__score">평점 {mr_score}</span>
          </div>
          <div className="mentor__info">
            <div className="mentor__namefollow">
              <h3 className="mentor__name">{m_name}</h3>
              <button
                className={
                  initialState == ""
                    ? "disabled"
                    : buttonInfo.className == "__followbutton"
                    ? "disabled"
                    : "mentormenti" + buttonInfo.className
                }
              >
                {buttonInfo.text}
              </button>
            </div>
            <span className="menti__number">팔로워 {m_c_number}명</span>
            <p className="mentor__intro">{m_p_intro}</p>
            <ul className="mentor__activity">
              <li className="activity__list">게시물: {post_number}개</li>
              <li className="activity__list">댓글: {cm_number}개</li>
            </ul>
          </div>
        </div>
      </Link>
    </>
  );
}

UserInfo.propTypes = {
  m_id: PropTypes.number.isRequired,
  m_name: PropTypes.string.isRequired,
  m_p_intro: PropTypes.string.isRequired,
  m_c_number: PropTypes.number.isRequired,
  mr_score: PropTypes.number.isRequired,
  post_number: PropTypes.number.isRequired,
  cm_number: PropTypes.number.isRequired,
};
