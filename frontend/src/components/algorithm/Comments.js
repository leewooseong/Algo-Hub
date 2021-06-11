import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import "../../styles/Comments.css";
import "../../styles/MentoReviewBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";


function Comments({ id, className, name, content, date, like, currentUser }) {
  const editComment = () => {
    const formData = new FormData();
    formData.append("s_cm_id", id);
    formData.append("s_cm_content", content);

    axios
      .put(`/api/solution/comments/${id}`, formData)
      .then((res) => {
        alert("성공");
      })
      .catch((err) => {
        alert("실패");
      });
  }

  const deleteComment = () => {
    const formData = new FormData();
    formData.append("s_cm_id", id);
    axios
      .delete(`/api/solution/comments/${id}`, formData)
      .then((res) => {
        alert("삭제 완료");
        window.location.reload(true);
      })
      .catch((error) => {
        alert("삭제 실패");
      });
  }



  return (
    <>
      <li className={className + "comment__list"}>
        <img
          className={className + "comment__image"}
          src="/assets/profileDefaultImage.png"
          alt="profile_image"
        ></img>
        <span className={className + "comment__writer"}>{name} -</span>
        <p className={className + "comment__content"}>{content}</p>
        <data className={className + "comment__date"}>{date}</data>
        <span className={className + "comment__like"}>{like}</span>
        {currentUser === name &&
          <>
            <FontAwesomeIcon icon={faEdit} onClick={editComment} className="comment__icons" />
            <FontAwesomeIcon icon={faTrash} onClick={deleteComment} className="comment__icons" />
          </>
        }
      </li>
    </>
  );
}

Comments.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  like: PropTypes.number.isRequired,
};

Comments.defaultProps = {
  image: "https://via.placeholder.com/18x18.jpg",
  className: "",
};

export default Comments;
