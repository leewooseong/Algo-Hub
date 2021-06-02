import axios from "axios";
import useChangeButton from "../../../use/useChangeButton";
import UserInfo from "./UserInfo";
import "../../../styles/MentoInfoBox.css";
import LiveButton from "./LiveButton";

const MentoInfoBox = ({
  m_name,
  m_p_image,
  m_c_number,
  m_p_intro,
  post_number,
  cm_number,
}) => {
  const buttonInfo = useChangeButton("Follow", "__followbutton");
  // 버튼 이벤트 처리
  const ClickSubscribe = () => {
    // 구독시 post 요청
    const formData = new FormData();
    formData.append("m_name", m_name);
    axios
      .post("/api/mentoring/subscribe", formData)
      .then((res) => {
        alert("성공");
        if (buttonInfo.text === "Follow") {
          buttonInfo.setText("Following");
        } else {
          buttonInfo.setText("Follow");
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
      {/* 클릭하면 Folloing button을 바뀌여야한다. */}
      <button
        className={"mentiview" + buttonInfo.className}
        onClick={() => {
          ClickSubscribe();
        }}
      >
        {buttonInfo.text}
      </button>
    </div>
  );
};

export default MentoInfoBox;
