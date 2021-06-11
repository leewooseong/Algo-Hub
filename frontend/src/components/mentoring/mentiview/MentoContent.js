import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import ModifyButton from "../../ModifyButton";
import DeleteButton from "../../DeleteButton";
import PropTypes from "prop-types";
import MentorModifyWriting from "./MentorModifyWriting";

// 등록된 글 하나하나를 나타내는 컴포넌트
function MentoContent({
  page,
  id,
  title,
  content,
  date,
  detail,
  mentorvalidation,
}) {
  const url = window.location.href.substring(21);

  return (
    <li className={detail ? "mentocontent__itemdetail" : "mentocontent__item"}>
      {detail ? (
        <>
          <p className="mentocontent__title">{title}</p>
          <p className="mentocontent__content">{content}</p>
          <div className="mentocontent__lastline">
            <data className="mentocontent__date">{date}</data>
            {mentorvalidation && (
              <div className="mentocontent__modifydelete">
                <ModifyButton
                  id={id}
                  title={title}
                  content={content}
                  page={page}
                  path={`/mentoring/mentiview/modify/${id}/board`}
                  buttonName=""
                />
                <DeleteButton id={id} page="board" m_name={""} />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link
            to={`${url}/detail/${page}#${id}`}
            className="mentocontent__itembutton"
          >
            <p className="mentocontent__title">{title}</p>
            <data className="mentocontent__date">{date}</data>
          </Link>
        </>
      )}
    </li>
  );
}

MentoContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default MentoContent;
