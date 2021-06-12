import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCertificate from "../../../use/useCertificate";
import useAxios from "../../../use/useAxios";
import axios from "axios";
import ReviewList from "./ReviewList";
import ModifyButton from "../../ModifyButton";
import DeleteButton from "../../DeleteButton";

const MentoReview = () => {
  const userArray = window.location.href.split("/");
  const mentorname = userArray[5];
  const user = useCertificate();
  const [mentorvalidation, setMentorvalidation] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  // 멘토 유효성 검사
  useEffect(() => {
    // 멘토인지 확인
    if (user.loading && mentorname != user.localUserName) {
      setMentorvalidation(false);
    } else {
      setMentorvalidation(true);
    }
    // 구독 정보 확인
    console.log("certificate working", user);
    if (user.loading) {
      // 구독 정보
      const fetchData = async () => {
        const result = await axios.get(
          `/api/subscription-info/user/${user.localUserId}`
        );
        console.log(result);
        // 비동기로 받아온 데이터를 이용해서 초기상태 지정
        if (result.data.SubscriptionList.includes(mentorname)) {
          setSubscribe(true);
        } else {
          setSubscribe(false);
        }
      };
      fetchData();
    }
  }, [user.loading]);

  // 댓글 api
  const mentoReviewData = useAxios({
    url: `/api/mentors/${mentorname}/review`,
  });

  // 평점을 위한 사용자 정보 api
  const mentoInfoData = useAxios({ url: `/api/mentors/${mentorname}` });

  // 사용자의 이름으로 댓글이 있으면 후기 작성 버튼이 아니라 수정 버튼으로 변경 + 해당 사용자가 작성한 정보 가져오기
  let writtenReview = false;
  let id = "";
  let title = "";
  let like = 0;
  let content = "";

  if (mentoReviewData.data) {
    let num = mentoReviewData.data.data.reviewList.length;
    console.log("num", num);
    // 반복문으로 배열에 저장된 리뷰 배열에 현재 유저가 있는지 탐색
    for (let i = num - 1; i >= 0; i--) {
      // 있으면 관련 정보 저장
      if (
        mentoReviewData.data.data.reviewList[i]["m_name"] == user.localUserName
      ) {
        writtenReview = true;
        id = mentoReviewData.data.data.reviewList[i]["mr_r_id"];
        // title = "";
        like = mentoReviewData.data.data.reviewList[i]["mr_r_like"];
        content = mentoReviewData.data.data.reviewList[i]["mr_r_content"];
        break;
      }
    }
  }

  // following 하는 사람만 댓글을 쓸 수 있도록 follow 여부 api 체크

  return (
    <div className="mentiview__detail">
      <div className="mentiview__mentoreview">
        <div className="mentiview__reviewtitle">
          <p>
            후기
            <span>
              {mentoInfoData.data && mentoInfoData.data.data.mentor.mr_score}점
            </span>
          </p>
        </div>
        {mentoReviewData.data && (
          <ReviewList contentData={mentoReviewData} detail={true} />
        )}
      </div>
      {/* 멘티라면 */}
      {!mentorvalidation &&
        (writtenReview && mentoReviewData.data ? (
          <div className="mentocontent__modifydelete">
            <ModifyButton
              className="mentiview__detailbutton"
              path={`/mentoring/mentiview/modify/${mentorname}/review`}
              id={id}
              title={title}
              content={content}
              like={like}
              buttonName={"리뷰"}
            />
            <DeleteButton
              id={id}
              page="review"
              m_name={mentorname}
              buttonName="리뷰"
            />
          </div>
        ) : subscribe ? (
          <Link
            to={{
              pathname: `/mentoring/mentiview/writing/${mentorname}/review`,
              state: { mentorvalidation, subscribe },
            }}
          >
            <button className="mentiview__detailbutton">리뷰 작성</button>
          </Link>
        ) : (
          <Link to={`/mentoring/mentiview/${mentorname}`}>
            <button className="mentiview__detailbutton">돌아가기</button>
          </Link>
        ))}
      {mentorvalidation && (
        <Link to={`/mentoring/mentiview/${mentorname}`}>
          <button className="mentiview__detailbutton">돌아가기</button>
        </Link>
      )}
    </div>
  );
};

export default MentoReview;
