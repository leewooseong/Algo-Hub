import React, { useState, useCallback } from "react";
import useConfirm from "../../../use/useConfirm";
import useCertificate from "../../../use/useCertificate";
import axios from "axios";

// useCallback? 함수 자체를 기억하고 있는 것
// 함수 생성 자체의 비용이 클 때 함수 생성 자체를 기억해 둬서 그 함수를 바로 이용할 수 있도록
// useCallback은 처음 기억한 녀석을 집요하게 기억하기 때문에 useCallback 안에서 사용되는 state는 인자로 넣어주어야한다.
const ReviewModifyWriting = (props) => {
  const user = useCertificate();
  const contentValue = props.location.state;
  console.log(contentValue);

  // url로 접근 시
  if (contentValue === undefined) {
    window.location.replace("/");
  }
  // url에서 멘토 이름 가져오기
  const userArray = window.location.href.split("/");
  const mentorname = userArray[6];

  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
  };

  const [content, setContent] = useInput(contentValue.content);
  const [mentorScore, setMentorScore] = useInput(contentValue.like);

  const doModifyReview = () => {
    const formData = new FormData();
    formData.append("m_name", mentorname);
    // 리뷰번호
    formData.append("mr_r_id", contentValue.id);
    formData.append("mr_r_like", mentorScore);
    formData.append("mr_r_content", content);

    axios
      .put(`/api/mentor/${mentorname}/review/${contentValue.id}`, formData)
      .then((res) => {
        alert("성공");
        props.history.goBack();
        // window.location.replace(window.document.referrer);
      })
      .catch((err) => {
        alert("실패");
      });
  };

  const doNotModify = () => {
    // do nothing...
  };

  const confirmModifyReview = useConfirm(
    "게시물을 수정하시겠습니까?",
    doModifyReview,
    doNotModify
  );

  const addPost = () => {
    confirmModifyReview();
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addPost();
    },
    [content, mentorScore]
  );

  return (
    <main className="App__main">
      {user.loading ? (
        <section className="main__section">
          <div className="writing">
            <h2 className="section__title">리뷰 수정</h2>
            <form onSubmit={onSubmit}>
              <label
                htmlFor="mb_c_category"
                className="writing__label"
                onChange={setMentorScore}
              >
                평점
                <select
                  className=""
                  name="mb_c_category"
                  id="board_category"
                  defaultValue={mentorScore}
                >
                  <option value="">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>

              <label htmlFor="mb_content" className="writing__label">
                내용
              </label>
              <textarea
                required
                className="writing__comment writing__input"
                name="mb_content"
                placeholder="내용을 입력하세요."
                rows="4"
                value={content}
                onChange={setContent}
              ></textarea>
              <button className="writing__btn" type="submit" value="등록">
                등록
              </button>
            </form>
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default ReviewModifyWriting;
