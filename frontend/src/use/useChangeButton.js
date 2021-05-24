import { useState, useEffect } from "react";

// axios에 대한 hooks
const useChangeButton = (initialText, initialClassName) => {
  const [text, setText] = useState(initialText);
  const [className, setClassName] = useState(initialClassName);

  // 구독 버튼 처리
  const changeSubscribeButton = () => {
    console.log(text);
    if (text === "Follow") {
      setClassName("__followbutton");
    } else if (text === "Following") {
      setClassName("__followingbutton");
    }
  };
  // 멘토 신청 버튼 처리
  const changeMentoAllowButton = () => {
    setClassName("__allow");
  };

  // text가 바뀌면 useEffect 실행
  useEffect(() => {
    if (text === "멘토") {
      changeMentoAllowButton();
    } else {
      changeSubscribeButton();
    }
  }, [text]);
  return { setText, className, text };
};

export default useChangeButton;
