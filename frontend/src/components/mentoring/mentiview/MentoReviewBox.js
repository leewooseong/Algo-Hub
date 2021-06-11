import "../../../styles/MentoReviewBox.css";
import PlusButton from "../../PlusButton";
import ReviewList from "./ReviewList";
import useAxios from "../../../use/useAxios";

const MentoReviewBox = ({ m_name, mr_score }) => {
  // 댓글 api
  const mentoReviewData = useAxios({ url: `/api/mentors/${m_name}/review` });

  return (
    <div className="mentiview__mentoreviewbox">
      <div className="mentiview__reviewtitle">
        <p>
          후기 <span>(평점 {mr_score}점)</span>
        </p>
        <PlusButton path={`/mentoring/mentiview/${m_name}/detail/review`} />
      </div>
      {mentoReviewData.data && (
        <ReviewList detail={false} contentData={mentoReviewData} />
      )}
    </div>
  );
};

export default MentoReviewBox;
