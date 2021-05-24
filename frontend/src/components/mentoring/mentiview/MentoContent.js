import React from "react";
import PropTypes from "prop-types";

function MentoContent({ title, content, date }) {
  return (
    <li className="mentocontent__item">
      <p>{title}</p>
      <data className="mentocontent__date">{date}</data>
    </li>
  );
}

MentoContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default MentoContent;
