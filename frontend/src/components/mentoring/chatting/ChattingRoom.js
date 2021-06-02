import { useState, useEffect } from 'react'
import useCertificate from '../../../use/useCertificate'

export default function ChattingRoom(data) {
  // const socket = new WebSocket("ws://" + window.location.pathname + "/signal");

  const certificate = useCertificate()
  const [localUserName, setlocalUserName] = useState(null)
  // const certificate = useCertificate()
  // const [socket, setSocket] = useState(new WebSocket("ws://localhost:8080/signal"))


  const socket = new WebSocket("ws://localhost:8080/signal")
  // let localUserName = ''
  // data.location.state.chatId        window.location.pathname.split('/')[4]
  const localRoom = window.location.pathname.split('/')[4]
  const mediaConstraints = {
    audio: true,
    video: true
  }
  const localVideo = ''
  let localStream;
  let localVideoTracks;

  const peerConnectionConfig = {
    'iceServers': [
      { 'urls': 'stun:stun.stunprotocol.org:3478' },
      { 'urls': 'stun:stun.l.google.com:19302' },
    ]
  };
  let myPeerConnection;

  useEffect(() => {
    {
      certificate.loading &&
        setlocalUserName(certificate.localUserName)
      {
        localUserName !== null && start()
      }
    }
  }, [certificate.loading, localUserName])

  // #1. socket init
  const start = () => {
    socket.onopen = () => {
      console.log('1. WebSocket connection opened to Room: #' + localRoom);
      // send a message to the server to join selected room with Web Socket

      console.log(`send to server:
        from: ${localUserName},
        type: "join",
        data: ${localRoom}
      `)
      sendToServer({
        from: localUserName,
        type: 'join',
        data: localRoom
      })
      console.log('sendtoserver')
    }

    socket.onmessage = function (msg) {
      let message = JSON.parse(msg.data)
      switch (message.type) {
        case "text":
          console.log('Text message from ' + message.from + ' received: ' + message.data)
          break
        case "offer":
          console.log('Signal OFFER received')
          handleOfferMessage(message)
          break;
        case "answer":
          console.log('Signal ANSWER received')
          handleAnswerMessage(message)
          break;
        // when a remote peer sends an ice candidate to us
        case "ice":
          console.log('Signal ICE Candidate received');
          handleNewICECandidateMessage(message.sdp);
          break;
        case "join":
          console.log('Client is starting to ' + (message.data === "true)" ? 'negotiate' : 'wait for a peer'));
          handlePeerConnection(message);
          break;
        default:
          handleErrorMessage('Wrong type message received from server')
      }
    }

    socket.onclose = function (message) {
      console.log('Socket has been closed')
    }

    socket.onerror = function (message) {
      handleErrorMessage("Error: " + message)
    }
  }

  function initialize() {

  }

  function handleOfferMessage(message) {
    console.log('Accepting Offer Message');
    let desc = new RTCSessionDescription(message.sdp);

    if (desc != null && message.sdp != null) {
      console.log('RTC Signalling state: ' + myPeerConnection.signalingState);
      myPeerConnection.setRemoteDescription(desc).then(function () {
        console.log("Set up local media stream");
        return navigator.mediaDevices.getUserMedia(mediaConstraints);
      })
        .then(function (stream) {
          console.log("-- Local video stream obtained");
          localStream = stream;
          try {
            localVideo.srcObject = localStream;
          } catch (error) {
            localVideo.src = window.URL.createObjectURL(stream);
          }

          console.log("-- Adding stream to the RTCPeerConnection");
          localStream.getTracks().forEach(track => myPeerConnection.addTrack(track, localStream));
        })
        .then(function () {
          console.log("-- Creating answer");
          // Now that we've successfully set the remote description, we need to
          // start our stream up locally then create an SDP answer. This SDP
          // data describes the local end of our call, including the codec
          // information, options agreed upon, and so forth.
          return myPeerConnection.createAnswer();
        })
        .then(function (answer) {
          console.log("-- Setting local description after creating answer");
          // We now have our answer, so establish that as the local description.
          // This actually configures our end of the call to match the settings
          // specified in the SDP.
          return myPeerConnection.setLocalDescription(answer);
        })
        .then(function () {
          console.log("Sending answer packet back to other peer");
          sendToServer({
            from: localUserName,
            type: 'answer',
            sdp: myPeerConnection.localDescription
          });

        })
        // .catch(handleGetUserMediaError);
        .catch(handleErrorMessage)
    }
  }

  function handleAnswerMessage() {

  }

  function handleNewICECandidateMessage(event) {
    if (event.candidate) {
      sendToServer({
        from: localUserName,
        type: 'ice',
        candidate: event.candidate
      })
      console.log('ICE Candidate Event: ICE candidate sent')
    }
  }

  // #2. RTCPeerConnection 
  function handlePeerConnection(message) {
    console.log('handlePeerConnection')
    createPeerConnection();
    // getMedia(mediaConstraints);
    if (message.data === "true") {
      myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent
    }
  }

  // #2-1. RTCPeerConnection 
  function createPeerConnection() {
    myPeerConnection = new RTCPeerConnection(peerConnectionConfig)
    myPeerConnection.onicecandidate = handleICECandidateEvent
    myPeerConnection.ontrack = handleTrackEvent;
  }

  // #2-2. handleICECandidateEvent 
  function handleICECandidateEvent(event) {
    console.log('handleICECandidateEvent')
    if (event.candidate) {
      sendToServer({
        from: localUserName,
        type: 'ice',
        candidate: event.candidate
      });
      console.log('ICE Candidate Event: ICE candidate sent');
    }
  }

  // #2-3. handleTrackEvent 
  function handleTrackEvent() {

  }

  // #3. createOffer 
  function handleNegotiationNeededEvent() {
    console.log('createOffer')
    myPeerConnection.createOffer().then(function (offer) {
      return myPeerConnection.setLocalDescription(offer)
    })
      .then(function () {
        sendToServer({
          from: localUserName,
          type: 'offer',
          sdp: myPeerConnection.localDescription
        })
        console.log('Negotiation Needed Event: SDP offer sent')
      })
      .catch(function (reason) {
        // an error occurred, so handle the failure to connect
        handleErrorMessage('failure to connect error: ', reason)
      })
  }

  function handleErrorMessage(message) {
    console.error(message)
  }

  function sendToServer(msg) {
    let msgJSON = JSON.stringify(msg)
    socket.send(msgJSON)
  }

  return (
    <div>hi</div>
  )
}