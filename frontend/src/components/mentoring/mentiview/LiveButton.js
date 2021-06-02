import axios from "axios"
import useAxios from '../../../use/useAxios'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import useCertificate from '../../../use/useCertificate'
import "../../../styles/LiveButton.css";

const LiveButton = () => {
  const mentor_name = window.location.href.split('/')[5]
  const RoomInfo = useAxios({ url: `/api/mentors/chatting/${mentor_name}` })

  const [liveOn, setLiveOn] = useState(false);
  const [chatID, setChatID] = useState(null)

  const myName = useCertificate().localUserName
  const ClickHandler = () => {
    if (liveOn) {
      // 멘티 접근
      if (myName !== mentor_name) {
        joinRoom()
      }
    } else if (!liveOn) {
      // LIVE OFF 시 멘토 접근
      if (myName === mentor_name) {
        setLiveOn(true);
        createRoom().then((res) => setChatID(res.data.chat_id))
        alert('OnAir')
      }
      // LIVE OFF 시 멘티 접근 시 
      else {
        alert('진행중인 채팅방이 없습니다.')
      }
    }
  };

  useEffect(() => {
    checkRoom()
  }, [])

  function checkRoom() {
    return axios.get(`/api/mentors/chatting/${mentor_name}`).then(function (res) {
      try {
        if (res.data.chat_activation === 'Y') {
          setLiveOn(true)
          setChatID(res.data.chat_id)
        }
      }
      catch {
        setLiveOn(false)
      }
    })
  }

  function joinRoom() {
    return axios.get(`/api/mentors/joinRoom/${mentor_name}/${chatID}`)
  }
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
        <Link className="live__link" to={{
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
