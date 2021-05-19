import React from 'react'
import '../../styles/Button.css'

function Button({ value }) {
  return (
    <button className="btn__">{value}</button>
  )
}

Button.defaultProps = {
  value: '등록'
}

export default Button