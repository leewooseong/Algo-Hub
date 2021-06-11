import React from "react";
import Search from "../algorithm/Search";
import PropTypes from "prop-types";
import "../../styles/Appbar.css";

function Appbar({ data }) {
  const categories = data.map((category) => category["p_category"]);
  return (
    <nav className="Appbar">
      <ul className="Appbar__container">
        <li className="Appbar__item">전체</li>
        {categories.map((category) => (
          <li className="Appbar__item">{category}</li>
        ))}
      </ul>
      <Search />
    </nav>
  );
}

Appbar.propTypes = {
  // id: PropTypes.number.isRequired,
  // categories: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default Appbar;
