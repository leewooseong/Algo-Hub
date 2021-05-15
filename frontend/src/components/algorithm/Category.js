import React from "react"
import PropTypes from "prop-types"
import '../../styles/Category.css'

function Category({ category, numberOfProblems, content }) {
  return <div className="categories">
    <h3 className="category__title">{category}</h3>
    <p className="category__detail">{content}</p>
    <div>
    </div>
    <ul className="category__label">
      <h4 className="label__np">문제 수</h4>
      <li className="category__np">{numberOfProblems}</li>
    </ul>
  </div>
}

Category.propTypes = {
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  numberOfProblems: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
}

export default Category