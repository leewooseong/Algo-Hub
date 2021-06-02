import "../../../styles/MentoReviewBox.css";
import PlusButton from "../../PlusButton";
import ReviewList from "./ReviewList";

const MentoReviewBox = ({ m_name, mr_score }) => {
  return (
    <div className="mentiview__mentoreviewbox">
      <div className="mentiview__reviewtitle">
        <p>
          후기 <span>(평점 {mr_score}점)</span>
        </p>
        <PlusButton path="/mentoring/mentiview/review" />
      </div>
      <ReviewList m_name={m_name} />
    </div>
  );
};

export default MentoReviewBox;
