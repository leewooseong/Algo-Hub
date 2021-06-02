import React from 'react'
import PropTypes from "prop-types"
import '../../styles/Language.css'

function Language({ id, language }) {
  return <li className="languages__languege" >{language}</li>
}

Language.propTypes = {
  id: PropTypes.number.isRequired,
  language: PropTypes.arrayOf.isRequired
}

export default Language