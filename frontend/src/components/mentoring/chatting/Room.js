import { useState, useEffect, useRef } from 'react'
import Chatting from './Chatting'
import useCertificate from '../../../use/useCertificate'
import '../../../styles/Room.css'
import axios from 'axios'

export default function Room(props) {
  // user variables
  const certificate = useCertificate()
  const [localUserName, setLocalUserName] = useState()
  const [mentorName, setMentorName] = useState('')
  const remoteUser = useRef()

  // room variables
  const [value, setValue] = useState('')
  const [chatLog, setChatLog] = useState([])
  let localRoom = props.location.state.chatId

  // RTC variabels
  const socket = useRef()
  // const [stream, setStream] = useState()
  const myPeerConnection = useRef()
  const dataChannel = useRef()

  // video variables
  const localVideo = useRef()
  const localStream = useRef()
  const remoteVideo = useRef()
  const senders = useRef([])

  // configurations
  const mediaConstraints = {
    audio: false,
    video: {
      width: 480,
      height: 360
    }
  }
  const screenConstraints = {
    video: {
      cursor: "always",
      width: 480,
      height: 360
    }
  }
  const peerConnectionConfig = {
    'iceServers': [
      { 'urls': 'stun:stun.stunprotocol.org:3478' },
      { 'urls': 'stun:stun.l.google.com:19302' },
    ]
  }

  useEffect(() => {
    const mentorName = window.location.href.split('/')[5]
    setMentorName(mentorName)
    if (certificate.localUserName) {
      setLocalUserName(certificate.localUserName)
    }
    if (localUserName) {
      socket.current = new WebSocket("ws://localhost:8080/signal")
      initSocket()
    }
  }, [certificate.loading, localUserName])

  // init
  function initSocket() {
    // add an event listener to get to know when a connection is open
    socket.current.onopen = function () {
      sendToServer({
        from: localUserName,
        type: 'join',
        data: localRoom
      })
    }
    // add an event listener for a message being received
    socket.current.onmessage = function (msg) {
      let message = JSON.parse(msg.data);
      switch (message.type) {
        case "text":
          console.log('Text message from ' + message.from + ' received: ' + message.data)
          break
        case "offer":
          console.log('Signal OFFER received')
          handleOfferMessage(message)
          break
        case "answer":
          console.log('Signal ANSWER received')
          handleAnswerMessage(message)
          break
        case "ice":
          console.log('Signal ICE Candidate received')
          handleNewICECandidateMessage(message)
          break
        case "join":
          console.log('Signal JOIN received')
          handlePeerConnection(message)
          break
        default:
          handleErrorMessage('Wrong type message received from server')
      }
    }
    // a listener for the socket being closed event
    socket.current.onclose = function (message) {
      console.log('Socket has been closed')
    };
    // an event listener to handle socket errors
    socket.current.onerror = function (message) {
      handleErrorMessage("Error: " + message)
    }
  }

  function stop() {
    // send a message to the server to remove this client from the room clients list
    console.log("Send 'leave' message to server");
    sendToServer({
      from: localUserName,
      type: 'leave',
      data: localRoom
    });

    if (myPeerConnection) {
      console.log('Close the RTCPeerConnection');

      // disconnect all our event listeners
      myPeerConnection.current.onicecandidate = null;
      myPeerConnection.current.ontrack = null;
      myPeerConnection.current.onnegotiationneeded = null;
      myPeerConnection.current.oniceconnectionstatechange = null;
      myPeerConnection.current.onsignalingstatechange = null;
      myPeerConnection.current.onicegatheringstatechange = null;
      myPeerConnection.current.onnotificationneeded = null;
      myPeerConnection.current.onremovetrack = null;

      // Stop the videos
      if (remoteVideo.srcObject) {
        remoteVideo.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (localVideo.current.srcObject) {
        localVideo.current.srcObject.getTracks().forEach(track => track.stop());
      }

      remoteVideo.current.src = null;
      localVideo.current.src = null;

      // close the peer connection
      myPeerConnection.current.close();
      myPeerConnection.current = null;

      console.log('Close the socket');
      if (socket != null) {
        socket.current.close();
      }
    }
  }

  function handleOfferMessage(message) {
    console.log('Accepting Offer Message')
    let desc = new RTCSessionDescription(message.sdp)
    if (desc != null && message.sdp != null) {
      console.log('RTC Signalling state: ' + myPeerConnection.current.signalingState)
      myPeerConnection.current.setRemoteDescription(desc).then(function () {
        console.log("Set up local media stream")
        return navigator.mediaDevices.getUserMedia(mediaConstraints)
      })
        .then(() => {
          console.log("-- Creating answer")
          return myPeerConnection.current.createAnswer()
        })
        .then((answer) => {
          console.log("-- Setting local description after creating answer")
          return myPeerConnection.current.setLocalDescription(answer)
        })
        .then(() => {
          console.log("Sending answer packet back to other peer")
          sendToServer({
            from: localUserName,
            type: 'answer',
            sdp: myPeerConnection.current.localDescription
          });
        })
        .catch(handleErrorMessage)
    }
  }

  function handleAnswerMessage(message) {
    console.log("The peer has accepted request")
    myPeerConnection.current.setRemoteDescription(message.sdp).catch(handleErrorMessage)
  }

  function handleNewICECandidateMessage(message) {
    let candidate = new RTCIceCandidate(message.candidate)
    console.log("Adding received ICE candidate: " + JSON.stringify(candidate))
    myPeerConnection.current.addIceCandidate(candidate).catch(handleErrorMessage)
  }

  // create peer connection, get media, start negotiating when second participant appears
  function handlePeerConnection(message) {
    createPeerConnection()
    getMedia(mediaConstraints)
    if (message.data === "true") {
      myPeerConnection.current.onnegotiationneeded = handleNegotiationNeededEvent
    }
  }

  // initialize media stream
  function getMedia(constraints) {
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      localVideo.current.srcObject = stream
      localStream.current = stream
      localStream.current.getTracks().forEach(track => senders.current.push(myPeerConnection.current.addTrack(track, localStream.current)))
    })
  }

  // start screen sharing
  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia(screenConstraints).then(stream => {
      localVideo.current.srcObject = stream
      const screenTrack = stream.getTracks()[0]
      senders.current.find(sender => sender.track.kind === 'video').replaceTrack(screenTrack)
      screenTrack.onended = function (e) {
        localVideo.current.srcObject = localStream.current
        senders.current.find(sender => sender.track.kind === 'video').replaceTrack(localStream.current.getTracks()[0])
      }
    })
  }
  function createPeerConnection() {
    myPeerConnection.current = new RTCPeerConnection(peerConnectionConfig)
    myPeerConnection.current.onicecandidate = handleICECandidateEvent
    myPeerConnection.current.ontrack = handleTrackEvent

    dataChannel.current = myPeerConnection.current.createDataChannel("dataChannel")
    dataChannel.current.onerror = function (error) {
      console.log("Error occured on datachannel:", error)
    }
    dataChannel.current.onmessage = handleReceiveMessage
    dataChannel.current.onclose = function () {
      console.log("data channel is closed")
    }
    myPeerConnection.current.ondatachannel = function (event) {
      dataChannel.current = event.channel;
    }
  }
  function handleReceiveMessage(e) {
    const msg = JSON.parse(e.data)
    setChatLog(chatLog => [...chatLog, { username: msg.username, content: msg.content }])
  }

  // WebRTC called handler to begin ICE negotiation
  function handleNegotiationNeededEvent() {
    myPeerConnection.current.createOffer().then((offer) => {
      return myPeerConnection.current.setLocalDescription(offer)
    }).then(() => {
      sendToServer({
        from: localUserName,
        type: 'offer',
        sdp: myPeerConnection.current.localDescription
      })
      console.log('Negotiation Needed Event: SDP offer sent')
    }).catch((error) => {
      handleErrorMessage('failure to connect error: ', error)
    })
  }

  // send ICE candidate to the peer through the server
  function handleICECandidateEvent(event) {
    if (event.candidate) {
      sendToServer({
        from: localUserName,
        type: 'ice',
        candidate: event.candidate
      });
      console.log('ICE Candidate Event: ICE candidate sent')
    }
  }

  async function handleTrackEvent(event) {
    console.log('remote video connected')
    remoteVideo.current.srcObject = event.streams[0];
  }

  function handleErrorMessage(error) {
    console.log(error)
  }

  // use JSON format to send WebSocket message
  function sendToServer(msg) {
    let msgJSON = JSON.stringify(msg)
    socket.current.send(msgJSON)
  }

  function handleOnClick() {
    if (!value) return
    const msg = {
      username: localUserName,
      content: value
    }
    dataChannel.current.send(JSON.stringify(msg))
    setChatLog(chatLog => [...chatLog, { username: msg.username, content: msg.content }])
    setValue('')
  }

  function handleDoubleClick(e) {
    e.target.requestFullscreen({ navigationUI: "hide" })
  }

  function exitRoom() {
    let url = props.history.location.pathname.split('/')
    url.pop(0)
    url = url.join('/')
    if (window.confirm("정말 나가시겠습니까?")) {
      stop()
      return axios.post(`/api/mentors/exitRoom/${localUserName}/${localRoom}`).then((res) => {
        props.history.push(url);
      })
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title"><span>{window.location.href.split('/')[5]}</span> 의 채팅방</h1>
      </header>
      <main className="main__section chatting__section">
        <div className="video__container">
          <video autoPlay ref={localVideo} onDoubleClick={handleDoubleClick}></video>
          <video autoPlay ref={remoteVideo} onDoubleClick={handleDoubleClick}></video>
        </div>
        {chatLog && <Chatting value={value} chat={chatLog} setValue={setValue} handleOnClick={handleOnClick} />}
      </main>
      <div className="chat__controller">
        <button>음성</button>
        <button>비디오</button>
        <button onClick={shareScreen}>공유</button>
        <button onClick={exitRoom}>나가기</button>
      </div>
    </div>
  )
}