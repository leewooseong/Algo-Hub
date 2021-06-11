import React, { useRef } from "react"
import Language from './Language'
import '../../styles/Problem.css'
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

function Problem({ id, mname, ptitle, plink }) {
  const sendData = useRef({
    a_id: id,
    p_title: ptitle,
    p_link: plink,
    mname: mname
  })
  return <div className="problem">
    <h3 className="problem__title">{ptitle}
      <a href={plink} target="_blank" className="problem__link" rel="external noreferrer noopener">
        <FontAwesomeIcon icon={faExternalLinkAlt} className="fas fa-external-link-alt"></FontAwesomeIcon> 문제 이동
      </a>
    </h3>
    <div className="problem__info">
      <img src="/assets/profileDefaultImage.png" alt="profile__image" className="user__image" />
      <span className="problem__writer">{mname}</span>
    </div>
    <Language data={sendData} key={id} />
  </div>
}

Problem.propTypes = {
  id: PropTypes.number.isRequired,
  ptitle: PropTypes.string.isRequired,
  plink: PropTypes.string.isRequired,
  mname: PropTypes.string.isRequired,
  languagelist: PropTypes.string.isRequired
}

export default Problem