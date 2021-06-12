import React, { useState, useCallback } from "react";
import useConfirm from "../../../use/useConfirm";
import axios from "axios";

export default function MentorModifyWriting(props) {
  // url로 접근 시
  if (contentValue === undefined) {
    window.location.replace("/");
  }

  // 어떤 페이지에서 왔는지 받아와 select에서 default value으로 사용
  const contentValue = props.location.state;
  let selected;
  if (contentValue.page == "notice") {
    selected = 1;
  } else if (contentValue.page == "curriculum") {
    selected = 2;
  } else if (contentValue.page == "curation") {
    selected = 3;
  }

  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
  };

  const [title, setTitle] = useInput(contentValue.title);
  const [content, setContent] = useInput(contentValue.content);
  const [boardCategory, setBoardCategory] = useInput(contentValue.page);

  const doModifyBoard = () => {
    const formData = new FormData();
    formData.append("mb_id", contentValue.id);
    formData.append("mb_title", title);
    formData.append("mb_content", content);

    return axios
      .put(`/api/mentor-board/${contentValue.id}`, formData)
      .then((res) => {
        alert("성공");
        window.location.replace(window.document.referrer);
      })
      .catch((err) => {
        alert("실패");
      });
  };

  const doNotModify = () => {
    // do nothing...
  };

  const confirmModifyBoard = useConfirm(
    "게시물을 수정하시겠습니까?",
    doModifyBoard,
    doNotModify
  );

  const addPost = () => {
    confirmModifyBoard();
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
              <select
                className=""
                name="mb_c_category"
                id="board_category"
                defaultValue={selected}
              >
                <option value="">게시판 선택</option>
                <option value="1">공지사항</option>
                <option value="2">커리큘럼</option>s
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
              value={title}
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
              value={content}
              onChange={setContent}
            ></textarea>
            <button className="writing__btn" type="submit" value="수정">
              수정
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
