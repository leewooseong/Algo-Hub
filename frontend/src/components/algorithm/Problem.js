import React from "react"
import { Link } from 'react-router-dom'
import Language from './Language'
import '../../styles/Problem.css'
import PropTypes from "prop-types"

function Problem({ id, mname, ptitle, plink, languagelist }) {
  const languageSet = ['C', 'C++', 'Java', 'Python']
  const handleClick = e => {
    console.log(e)
  }
  return <div className="problem">
    <h3 className="problem__title">{ptitle}
      <a href={plink} target="_blank" className="problem__link" rel="external noreferrer noopener">
        <i className="fas fa-external-link-alt"></i> 문제 이동
      </a>
    </h3>
    <div className="problem__info">
      <span className="problem__writer">{mname}</span>
      <ul className="languages">
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
          {languageSet.map((language, index) =>
            <Language onClick={handleClick} id={id} language={language} />
          )}
        </Link>
      </ul>
    </div>

  </div>
}

Problem.propTypes = {
  id: PropTypes.number.isRequired,
  ptitle: PropTypes.string.isRequired,
  plink: PropTypes.string.isRequired,
  mname: PropTypes.string.isRequired,
  languagelist: PropTypes.string.isRequired
  // languagelist: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Problem