import { useState, useEffect } from "react";
import axios from "axios";
import useChangeButton from "../../../use/useChangeButton";
import useConfirm from "../../../use/useConfirm";
import UserInfo from "./UserInfo";
import "../../../styles/MentoInfoBox.css";
import LiveButton from "./LiveButton";
import Modal from "../../Modal";

const MentoInfoBox = ({
  m_name,
  m_p_image,
  m_c_number,
  m_p_intro,
  post_number,
  cm_number,
  mentorvalidation,
  userCertificate,
  reviewData,
}) => {
  // 구독 여부 알아오는 변수
  const [initialState, setInitialState] = useState("");
  const [initialClassName, setInitialClassName] = useState("__disabled");
  // 멘토 리스트 저장 변수
  const [mentiList, setMentiList] = useState(null);

  //초기에 페이지 로딩 시 userid를 받아왔다면 현재 사용자의 구독정보를 알아온다.
  useEffect(() => {
    console.log("certificate working", userCertificate);
    if (userCertificate.loading) {
      // 구독 정보
      const fetchData = async () => {
        const result = await axios.get(
          `/api/subscription-info/user/${userCertificate.localUserId}`
        );
        console.log(result);
        setMentiList(result.data.SubscriptionList);
        // 비동기로 받아온 데이터를 이용해서 초기상태 지정
        if (result.data.SubscriptionList.includes(m_name)) {
          console.log("includes name!");
          setInitialState("Following");
          setInitialClassName("__followingbutton");
        } else {
          console.log("not includes name;");
          setInitialState("Follow");
          setInitialClassName("__followbutton");
        }
      };
      fetchData();
      // 구독 정보를 이용하여 해당 멘토에 대해 구독 중인지 판별
    }
  }, [userCertificate.loading]);

  const buttonInfo = useChangeButton(initialState, initialClassName);

  useEffect(() => {
    console.log("initialState is changed", initialState, buttonInfo.text);
    buttonInfo.setText(initialState);
  }, [initialState]);

  // 구독 취소 알림창
  // 확인 선택 시
  const cancelFollowing = () => {
    // 1. 멘토상태 변경
    buttonInfo.setText("Follow");

    // 2. 멘토 후기 삭제
    let id;
    let num = reviewData.data.data.reviewList.length;
    console.log("num", num);
    if (num > 0) {
      // 반복문으로 배열에 저장된 리뷰 배열에 현재 유저가 있는지 탐색
      for (let i = num - 1; i >= 0; i--) {
        // 있으면 관련 정보 저장
        // 지금은 유저네임이 없어;
        if (
          reviewData.data.data.reviewList[i]["m_name"] ==
          userCertificate.localUserName
        ) {
          id = reviewData.data.data.reviewList[i]["mr_r_id"];
          break;
        }
      }
      // 데이터 생성
      const formData = new FormData();
      formData.append("m_name", m_name);
      formData.append("mb_r_id", id);
      axios
        .delete(`/api/mentor/${m_name}/review/${id}`, formData)
        .then((res) => {
          alert("삭제 완료");
          window.location.reload(true);
        })
        .catch((error) => {
          alert("삭제할 후기가 없습니다.");
        });
    }
  };
  // 취소 선택 시
  const keepFollowing = () => {
    // do nothing
  };

  const confirmCancelFollowing = useConfirm(
    "구독을 취소하시겠습니까? 취소 시 후기 내역이 삭제됩니다.",
    cancelFollowing,
    keepFollowing
  );

  // 버튼 이벤트 처리
  const ClickSubscribe = () => {
    // 구독시 post 요청
    // 구독 해제시 구독자가 썼던 후기도 삭제하는 처리 필요
    const formData = new FormData();
    formData.append("m_name", m_name);
    axios
      .post("/api/mentoring/subscribe", formData)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("before change", buttonInfo.text);
          if (buttonInfo.text === "Follow") {
            buttonInfo.setText("Following");
            alert("성공");
          } else {
            confirmCancelFollowing();
          }
        } else {
        }
      })
      .catch((err) => {
        alert("실패");
      });
  };

  return (
    <div className="mentiview__mentoinfobox">
      <div className="mentiview__userinfo">
        <UserInfo
          classname="mentiview"
          m_name={m_name}
          m_p_image={m_p_image}
          m_c_number={m_c_number}
          post_number={post_number}
          cm_number={cm_number}
        />
        <LiveButton />
      </div>
      <p className="mentiview__mentointro">{m_p_intro}</p>
      {/* 클릭하면 Following button을 바뀌여야한다.*/}
      {mentorvalidation ? (
        <button className={"mentiview__mentobutton"}>Mento</button>
      ) : (
        <button
          className={"mentiview" + buttonInfo.className}
          onClick={() => {
            ClickSubscribe();
          }}
        >
          {buttonInfo.text}
        </button>
      )}
    </div>
  );
};

export default MentoInfoBox;
