import { useState } from 'react'
import '../../../styles/Chatting.css'

export default function Chatting({ chat, setValue, handleOnClick }) {

  const [text, setText] = useState('')
  function handleOnChange(e) {
    setValue(e.target.value)
    setText(e.target.value)
  }

  function handleOnKeyPress(e) {
    if (e.shiftKey && e.key === 'Enter') {
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (!text) return
      handleOnClick()
      setText('')
      setValue('')
    }
  }

  return (
    <div className="chatbox">
      <div className="chat__header">
        <h2>대화</h2>
      </div>
      <div className="chatlogs">
        {chat && chat.map((chatting) =>
          <div className="chat">
            <span className="chat__username">{chatting.username}</span>
            <p className="chat__content">{chatting.content}</p>
          </div>
        )}

      </div>

      <div className="chat__form">
        <textarea value={text} onChange={handleOnChange} onKeyPress={handleOnKeyPress} placeholder="내용을 입력하세요"></textarea>
        <button onClick={handleOnClick} className="blind">send</button>
      </div>
    </div >
  )
}