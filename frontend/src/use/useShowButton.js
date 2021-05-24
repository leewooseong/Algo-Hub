import { useState, useEffect } from "react";
import $ from "jquery";
import {} from "jquery.cookie";

// axios에 대한 hooks
const useShowButton = () => {
  const [showClass, setShowClass] = useState("unShowButton");

  // 멘토 신청 버튼 처리
  const showButton = () => {
    console.log($.cookie("JSESSIONID"));
    if ($.cookie("JSESSIONID")) {
      setShowClass("showButton");
    }
  };

  // text가 바뀌면 useEffect 실행
  useEffect(() => {
    showButton();
  }, [showClass]);
  return { showClass };
};

export default useShowButton;
