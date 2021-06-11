// import { useState, useEffect } from "react";
import Comments from "../../algorithm/Comments";

const ReviewList = ({ m_name, contentData }) => {
  return (
    //   사용방법 1..
    <ul className="mentiview__reviewlist">
      {contentData.data &&
        contentData.data.data.reviewList.map((review) => {
          // 여기가 포인트
          return (
            <Comments
              page="mentiview"
              id={review.mr_r_id}
              key={review.mr_r_id}
              name={review.m_name}
              content={review.mr_r_content}
              like={review.mr_r_like}
              date={review.mr_r_date}
            />
          );
        })}
    </ul>
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
    // <div>test</div>
  );
};

export default ReviewList;
