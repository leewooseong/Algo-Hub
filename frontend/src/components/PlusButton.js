import React from "react";
import { Link } from "react-router-dom";
import "../styles/PlusButton.css";

const PlusButton = ({ path }) => {
  return (
    <Link to={path}>
      <button className="plusbutton">+</button>
    </Link>
  );
};

export default PlusButton;
