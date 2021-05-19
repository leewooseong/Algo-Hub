import React from 'react'
import PropTypes from "prop-types"
import '../../styles/Language.css'

function Language({ languagelist }) {
  return <ul className="language__list">
    <li className="languages__languege" >{languagelist}</li>
    {/* {languagelist.map(language =>
      <li className="languages__languege" >{language}</li>
    )} */}
  </ul>
}

Language.propTypes = {
  id: PropTypes.number.isRequired,
  languagelist: PropTypes.string.isRequired

  // Languagelist: PropTypes.arrayOf.isRequired
}

export default Language