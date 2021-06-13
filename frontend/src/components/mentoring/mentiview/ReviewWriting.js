import React, { useState, useCallback } from "react";
import useCertificate from "../../../use/useCertificate";
import axios from "axios";

const ReviewWriting = (props) => {
  // url로 접근 시 돌려보내기
  if (props.location.state === undefined) {
    window.location.replace("/");
  }

  const user = useCertificate();

  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
  };

  const userArray = window.location.href.split("/");
  const mentorname = userArray[6];

  const [content, setContent] = useInput("");
  const [mentorScore, setMentorScore] = useInput("");

  const addPost = () => {
    const formData = new FormData();
    formData.append("m_name", mentorname);
    formData.append("mr_r_like", mentorScore);
    formData.append("mr_r_content", content);
    // formData.append("mr_r_data", content);

    return axios
      .post("/api/mentors/review", formData)
      .then((res) => {
        alert("성공");
        props.history.goBack();
        // window.location.replace(window.document.referrer);
      })
      .catch((err) => {
        alert("실패");
      });
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
            <h2 className="section__title">리뷰 등록</h2>
            <form onSubmit={onSubmit}>
              <label
                htmlFor="mb_c_category"
                className="writing__label"
                onChange={setMentorScore}
              >
                평점
                <select className="" name="mb_c_category" id="board_category">
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

export default ReviewWriting;
