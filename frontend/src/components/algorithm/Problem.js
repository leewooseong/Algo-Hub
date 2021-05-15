import React from "react"
import { Link } from 'react-router-dom'
import '../../styles/Problem.css'
import PropTypes from "prop-types"

function Problems({ id, mname, ptitle, plink, languagelist }) {
  return <div className="problem">
    <h3 className="problem__title">{ptitle}
      <a href={plink} target="_blank" className="problem__link" rel="external noreferrer noopener">
        <i className="fas fa-external-link-alt"></i> 문제 이동
      </a>
    </h3>
    <div className="problem__info">
      <span className="problem__writer">{mname}</span>
      <ul className="languages">
        {/* {languagelist && languagelist.map((language, index) => 
        <li className="languages__languege" key={index}>{language}</li>)} */}
        <Link to={{
          pathname: `/category/algorithm/solution/${id}`,
          state: {
            a_id: id,
            p_title: ptitle,
            p_link: plink,
            mname: mname,
            language: languagelist
          }
        }}>
          <li className="languages__languege">{languagelist}</li>
        </Link>
      </ul>
    </div>

  </div>
}

Problems.propTypes = {
  id: PropTypes.number.isRequired,
  ptitle: PropTypes.string.isRequired,
  plink: PropTypes.string.isRequired,
  mname: PropTypes.string.isRequired,
  languagelist: PropTypes.string.isRequired
  // languagelist: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Problems