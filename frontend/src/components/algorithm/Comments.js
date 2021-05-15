import React from "react";
import PropTypes from "prop-types";
import '../../styles/Comments.css'

function Comments({ image, name, content, date, like }) {
  return (
    <li className="comment__list">
      <img className="comment__image" src={image} alt="profile_image"></img>
      <span className="comment__writer">{name} -</span>
      <p className="comment__content">{content}</p>
      <data className="comment__date">{date}</data>
      <span className="comment__like">{like}</span>
    </li>
  )
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
  image: "https://via.placeholder.com/18x18.jpg"
}

export default Comments;
