import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Language.css'

function Language({ data }) {
  const aid = data.current.a_id
  const ptitle = data.current.p_title
  const mname = data.current.mname
  const languageSet = ['C', 'C++', 'Java', 'Python']

  return (
    <ul className="languages">
      {languageSet && languageSet.map((language, index) =>
        <Link to={
          {
            pathname: `/category/algorithm/solution/${aid}/${language}`,
            state: {
              language: language,
              ptitle: ptitle,
              aid: aid,
              mname: mname
            }
          }
        }>
          <li className="languages__language" key={index}>{language}</li>
        </Link>
      )}
    </ul>
  )
}

export default Language