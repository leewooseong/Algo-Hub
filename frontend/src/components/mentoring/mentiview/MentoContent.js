import React from "react";
import PropTypes from "prop-types";

function MentoContent({ title, content, date }) {
  // 세부 페이지 인지 아닌지 detail 변수를 이용해서 판단
  const urlArray = window.location.href.split("/");
  let detail = false;
  if (
    urlArray.length === 7 &&
    (urlArray[urlArray.length - 1] === "notice" ||
      urlArray[urlArray.length - 1] === "curriculum" ||
      urlArray[urlArray.length - 1] === "curation")
  ) {
    detail = true;
  }
  return (
    <li className={detail ? "mentocontent__itemdetail" : "mentocontent__item"}>
      <p className="mentocontent__title">{title}</p>
      {detail ? <p className="mentocontent__content">{content}</p> : <p></p>}
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
