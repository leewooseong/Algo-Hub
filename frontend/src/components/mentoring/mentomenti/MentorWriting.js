import React, { useState, useCallback } from "react";
import axios from "axios";

export default function MentorWriting(props) {
  // url로 접근 시 돌려보내기
  if (props.location.state === undefined) {
    window.location.replace("/");
  }
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
  };

  const [title, setTitle] = useInput("");
  const [content, setContent] = useInput("");
  const [boardCategory, setBoardCategory] = useInput("");

  const addPost = () => {
    const formData = new FormData();
    formData.append("mb_c_id", boardCategory);
    formData.append("mb_title", title);
    formData.append("mb_content", content);

    return axios
      .post("/api/mentors/writing", formData)
      .then((res) => {
        alert("성공");
        props.history.goBack();
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
    [title, content, boardCategory]
  );

  return (
    <main className="App__main">
      <section className="main__section">
        <div className="writing">
          <h2 className="section__title">게시글 작성</h2>
          <form onSubmit={onSubmit}>
            <label
              htmlFor="mb_c_category"
              className="writing__label"
              onChange={setBoardCategory}
            >
              게시판 분류
              <select className="" name="mb_c_category" id="board_category">
                <option value="">게시판 선택</option>
                <option value="1">공지사항</option>
                <option value="2">커리큘럼</option>
                <option value="3">큐레이션</option>
              </select>
            </label>
            <label htmlFor="mb_title" className="writing__label" required>
              글 제목
            </label>
            <input
              name="mb_title"
              type="text"
              className="writing__input"
              onChange={setTitle}
            ></input>

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
    </main>
  );
}
