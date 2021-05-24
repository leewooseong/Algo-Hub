import { useState, useEffect } from "react";
import Comments from "../../algorithm/Comments";
import useAxios from "../../../use/useAxios";

const ReviewList = () => {
  // 댓글 api로 나중에 대체 예정
  const reviewData = [
    {
      s_cm_id: 1,
      m_name: "안녕",
      s_cm_content: "대박",
      s_cm_date: "2021-02-23",
      s_cm_like: 12,
    },
    {
      s_cm_id: 2,
      m_name: "Alg2",
      s_cm_content: "aaaaasdgasdgnasdnkganksdgwoegbjzx zksdgabudjdgnjagb",
      s_cm_date: "2021-02-23",
      s_cm_like: 11,
    },
    {
      s_cm_id: 3,
      m_name: "AlgoMaster3",
      s_cm_content: "와우",
      s_cm_date: "2021-02-23",
      s_cm_like: 10,
    },
  ];

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
    <ul className="mentiview__reviewlist">
      {reviewData.map((review) => (
        <Comments
          id={review["s_cm_id"]}
          key={review["s_cm_id"]}
          className="mentiview"
          image="/assets/profileDefaultImage.png"
          name={review["m_name"]}
          content={review["s_cm_content"]}
          date={review["s_cm_date"]}
          like={review["s_cm_like"]}
        />
      ))}
    </ul>
  );
};

export default ReviewList;
