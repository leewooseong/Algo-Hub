import React from "react";
import PropTypes from "prop-types";
import "../../styles/Comments.css";
import "../../styles/MentoReviewBox.css";

function Comments({ className, image, name, content, date, like }) {
  return (
    <li className={className + "comment__list"}>
      <img
        className={className + "comment__image"}
        src={image}
        alt="profile_image"
      ></img>
      <span className={className + "comment__writer"}>{name} -</span>
      <p className={className + "comment__content"}>{content}</p>
      <data className={className + "comment__date"}>{date}</data>
      <span className={className + "comment__like"}>{like}</span>
    </li>
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
