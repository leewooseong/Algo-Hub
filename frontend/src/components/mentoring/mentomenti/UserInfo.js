import "../../../styles/UserInfo.css";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { post } from "axios";

export default function UserInfo({
  m_id,
  m_name,
  m_p_intro,
  m_c_number,
  mr_score,
  post_number,
  cm_number,
}) {

  const putSubscribe = () => {
    const url = "/api/mentoring/subscribe";
    const formData = new FormData();
    formData.append("m_name", m_name);
    const config = {
      headers: {
        "content-type": "text/html",
      },
    };
    return post(url, formData, config);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    putSubscribe();
  };

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
            <h3 className="mentor__name">{m_name}</h3>
            <span className="menti__number">팔로워 {m_c_number}명</span>
            <p className="mentor__intro">{m_p_intro}</p>
            <ul className="mentor__activity">
              <li className="activity__list">게시물: {post_number}개</li>
              <li className="activity__list">댓글: {cm_number}개</li>
            </ul>
            <button className="subscribe__btn" onClick={handleOnClick}>
              Follow
            </button>
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
