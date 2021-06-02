import axios from "axios"
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import ChattingRoom from '../chatting/ChattingRoom'
import "../../../styles/LiveButton.css";


const LiveButton = () => {
  const [liveOn, setLiveOn] = useState(false);
  const [chatID, setChatID] = useState(null)
  const [onair, setOnAir] = useState(true)
  const ClickHandler = () => {
    if (liveOn) {
      setLiveOn(false);
    } else if (!liveOn) {
      setLiveOn(true);
      createRoom().then((res) => setChatID(res.data.chat_id))
    }
  };

  function createRoom() {
    return axios.post('/api/mentors/createRoom')
  }

  const button =
    <button
      className={liveOn ? "button__liveon" : "button__liveoff"}
      onClick={ClickHandler}>
      <span>LIVE </span>
      <img src="/assets/liveOff.png" />
    </button>

  return (
    <>
      {chatID ?
        <Link to={{
          pathname: `${window.location.pathname}/${chatID}`,
          state: { chatId: chatID }
        }}>
          {button}
        </Link>
        :
        button
      }
    </>
  );
};

export default LiveButton;
