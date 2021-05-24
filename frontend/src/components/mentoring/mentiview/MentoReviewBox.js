import { useState, useEffect } from "react";
import "../../../styles/MentoReviewBox.css";
import ReviewList from "./ReviewList";

const MentoReviewBox = ({ mr_score }) => {
  return (
    <div className="mentiview__mentoreviewbox">
      <div className="mentiview__reviewtitle">
        <p>
          후기 <span>(평점 {mr_score}점)</span>
        </p>
      </div>
      <ReviewList />
    </div>
  );
};

export default MentoReviewBox;
