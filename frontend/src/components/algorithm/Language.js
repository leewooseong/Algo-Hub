import { getQueriesForElement } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Language.css'

function Language({ data, currentLanguage }) {
  const aid = data.current.a_id
  const ptitle = data.current.p_title
  const mname = data.current.mname
  const languageSet = ['C', 'C++', 'Java', 'Python']
  const [URL, setURL] = useState(window.location.href)

  function getURL() {
    if (URL !== window.location.href) {
      window.location.reload(window.location.href)
    }
  }

  useEffect(() => {
    getURL()
  })



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
          {currentLanguage === language
            ? <li className="languages__language current__language" key={index}>{language}</li>
            : <li className="languages__language" key={index}>{language}</li>
          }
        </Link>
      )}
    </ul>


  )
}

export default Language