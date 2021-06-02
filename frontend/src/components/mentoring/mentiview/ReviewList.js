// import { useState, useEffect } from "react";
// import Comments from "../../algorithm/Comments";
import useAxios from "../../../use/useAxios";

const ReviewList = ({ m_name }) => {
  // 댓글 api로 나중에 대체 예정
  const mentoReviewData = useAxios({ url: `/api/mentors/${m_name}/review` });
  console.log("review data:", mentoReviewData.data);

  return (
    //   사용방법 1..
    // <ul>
    //   {reviewData.map((review) => {
    //     // 여기가 포인트
    //     return (
    //       <Comments
    //         id={review.s_cm_id}
    //         key={review.s_cm_id}
    //         name={review.m_name}
    //         content={review.s_cm_content}
    //         date={review.s_cm_date}
    //         like={review.s_cm_like}
    //       />
    //     );
    //   })}
    // </ul>
    // 사용방법 2..
    //   <ul className="mentiview__reviewlist">
    //     {reviewData.map((review) => (
    //       <Comments
    //         id={}
    //         key={}
    //         className="mentiview"
    //         image="/assets/profileDefaultImage.png"
    //         name={}
    //         content={}
    //         date={}
    //         like={}
    //       />
    //     ))}
    //   </ul>
    <div>test</div>
  );
};

export default ReviewList;
