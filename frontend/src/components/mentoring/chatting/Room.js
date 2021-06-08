import { useState, useEffect, useRef } from 'react'
import Chatting from './Chatting'
import useCertificate from '../../../use/useCertificate'
import '../../../styles/Room.css'
import axios from 'axios'

export default function Room(props) {
  const [value, setValue] = useState('')
  const [chatLog, setChatLog] = useState([])
  const [stream, setStream] = useState()
  const [localUserName, setLocalUserName] = useState()
  const certificate = useCertificate()
  const socket = useRef()
  const localVideo = useRef()
  const remoteVideo = useRef()
  const senders = useRef()
  const myPeerConnection = useRef()
  const dataChannel = useRef()
  let localRoom = props.location.state.chatId;
  const mediaConstraints = {
    audio: false,
    video: {
      width: 460,
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
    if (certificate.localUserName) {
      socket.current = new WebSocket("ws://localhost:8080/signal")

      setStream(stream)
      setLocalUserName(certificate.localUserName)
      if (localVideo.current) {
        localVideo.current.srcObject = stream
      }
    }
    if (localUserName) { initSocket() }
  }, [certificate.loading, localUserName])

  function initSocket() {
    socket.current.onopen = function () {
      sendToServer({
        from: localUserName,
        type: 'join',
        data: localRoom
      });
    }
    socket.current.onmessage = function (msg) {
      let message = JSON.parse(msg.data);
      switch (message.type) {
        case "text":
          console.log('Text message from ' + message.from + ' received: ' + message.data);
          break;
        case "offer":
          console.log('Signal OFFER received');
          handleOfferMessage(message);
          break;
        case "answer":
          console.log('Signal ANSWER received');
          handleAnswerMessage(message);
          break;
        case "ice":
          console.log('Signal ICE Candidate received');
          handleNewICECandidateMessage(message);
          break;
        case "join":
          console.log('Signal JOIN received')
          handlePeerConnection(message);
          break;
        default:
          handleErrorMessage('Wrong type message received from server');
      }
    }
    socket.current.onclose = function (message) {
      console.log('Socket has been closed');
    };
    // an event listener to handle socket errors
    socket.current.onerror = function (message) {
      handleErrorMessage("Error: " + message);
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
    console.log('Accepting Offer Message');
    let desc = new RTCSessionDescription(message.sdp);

    if (desc != null && message.sdp != null) {
      console.log('RTC Signalling state: ' + myPeerConnection.current.signalingState);
      myPeerConnection.current.setRemoteDescription(desc).then(function () {
        console.log("Set up local media stream");
        return navigator.mediaDevices.getUserMedia(mediaConstraints);
      }).then(function (stream) {
        console.log("-- Local video stream obtained");
        // localStream = stream;
        try {
          localVideo.current.srcObject = stream;
        } catch (error) {
          localVideo.src = window.URL.createObjectURL(stream);
        }
        console.log("-- Adding stream to the RTCPeerConnection");
        stream.getTracks().forEach(track => myPeerConnection.current.addTrack(track, stream));
      })
        .then(function () {
          console.log("-- Creating answer");
          return myPeerConnection.current.createAnswer();
        })
        .then(function (answer) {
          console.log("-- Setting local description after creating answer");
          return myPeerConnection.current.setLocalDescription(answer);
        })
        .then(function () {
          console.log("Sending answer packet back to other peer");
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
    console.log("The peer has accepted request");
    myPeerConnection.current.setRemoteDescription(message.sdp).catch(handleErrorMessage);
  }

  function handleNewICECandidateMessage(message) {
    let candidate = new RTCIceCandidate(message.candidate);
    console.log("Adding received ICE candidate: " + JSON.stringify(candidate));
    myPeerConnection.current.addIceCandidate(candidate).catch(handleErrorMessage);
  }

  function handlePeerConnection(message) {
    createPeerConnection()
    getMedia(mediaConstraints)
    if (message.data === "true") {
      myPeerConnection.current.onnegotiationneeded = handleNegotiationNeededEvent
    }
  }
  function getMedia(constraints) {
    navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
      localVideo.current.srcObject = mediaStream;
      mediaStream.getTracks().forEach(track => {
        myPeerConnection.current.addTrack(track, mediaStream);
      });
    })
  }
  function shareScreen() {
    navigator.mediaDevices.getDisplayMedis({ cursor: true }).then(stream => {
      const screenTrack = stream.getTracks()[0]
      senders.current.find(sender => sender.track.kind === 'video').replaceTrack(screenTrack)
      screenTrack.onended = function () {
        senders.current.find(sender => sender.track.kind === 'video').replaceTrack(localVideo.current.getTracks()[1])
      }
    })
  }
  function createPeerConnection() {
    myPeerConnection.current = new RTCPeerConnection(peerConnectionConfig);
    myPeerConnection.current.onicecandidate = handleICECandidateEvent
    myPeerConnection.current.ontrack = handleTrackEvent;

    dataChannel.current = myPeerConnection.current.createDataChannel("dataChannel");
    dataChannel.current.onerror = function (error) {
      console.log("Error occured on datachannel:", error);
    };
    dataChannel.current.onmessage = handleReceiveMessage
    dataChannel.current.onclose = function () {
      console.log("data channel is closed");
    };
    myPeerConnection.current.ondatachannel = function (event) {
      dataChannel.current = event.channel;
    };
  }
  function handleReceiveMessage(e) {
    const msg = JSON.parse(e.data)
    setChatLog(chatLog => [...chatLog, { username: msg.username, content: msg.content }])
  }

  function handleNegotiationNeededEvent() {
    console.log('createpeer')
    myPeerConnection.current.createOffer().then(function (offer) {
      return myPeerConnection.current.setLocalDescription(offer)
    })
      .then(function () {
        sendToServer({
          from: localUserName,
          type: 'offer',
          sdp: myPeerConnection.current.localDescription
        })
        console.log('Negotiation Needed Event: SDP offer sent')
      })
      .catch(function (reason) {
        // an error occurred, so handle the failure to connect
        handleErrorMessage('failure to connect error: ', reason)
      })
  }

  function handleICECandidateEvent(event) {
    if (event.candidate) {
      sendToServer({
        from: localUserName,
        type: 'ice',
        candidate: event.candidate
      });
      console.log('ICE Candidate Event: ICE candidate sent');
    }
  }

  function handleTrackEvent(event) {
    console.log(event)
    remoteVideo.current.srcObject = event.streams[0];
  }

  function handleErrorMessage(error) {
    console.log(error)
  }

  function sendToServer(msg) {
    let msgJSON = JSON.stringify(msg)
    socket.current.send(msgJSON)
  }

  function handleDoubleClick(e) {
    e.target.requestFullscreen({ navigationUI: "hide" })
  }

  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia(mediaConstraints).then(stream =>
      localVideo.current.srcObject = stream
    )
  }

  function handleOnChange(e) {
    setValue(e.target.value)
  }

  function handleOnClick() {
    if (!value) return
    const msg = {
      username: localUserName,
      content: value
    }
    setChatLog(chatLog => [...chatLog, { username: msg.username, content: msg.content }])
    dataChannel.current.send(JSON.stringify(msg))
    setValue('')
  }


  function exitRoom() {
    let url = props.history.location.pathname.split('/')
    url.pop(0)
    url = url.join('/')
    // stop()
    return axios.post(`/api/mentors/exitRoom/${localUserName}/${localRoom}`).then((res) => {
      console.log(props.history.location)
      if (res.data.message === 'OK') {
        alert('채팅방이 종료되었습니다.')
      }
      props.history.push(url);
    })
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