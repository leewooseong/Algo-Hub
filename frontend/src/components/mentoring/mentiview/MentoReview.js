import ReviewList from "./ReviewList";

// 변수를 어떻게 처리할 것인가..
// api 완성되면 하는 것이기에 제일 마지막에!

const MentoReview = ({ mr_score }) => {
  return (
    <div className="mentiview__mentoreview">
      <div className="mentiview__reviewtitle">
        <p>
          후기 <span>(평점 5.0점)</span>
        </p>
      </div>
      <ReviewList />
    </div>
  );
};

export default MentoReview;
