import { useState, useEffect } from 'react'
import useCertificate from '../../../use/useCertificate'

export default function ChattingRoom() {
  const socket = new WebSocket("ws://localhost:8080/signal")
  const certificate = useCertificate()
  const [localUserName, setlocalUserName] = useState(null)  // 현재 사용자
  const localRoom = window.location.pathname.split('/')[4]  // 

  const mediaConstraints = {
    audio: true,
    video: true
  }
  let dataChannel = ''
  const localVideo = ''
  let localStream;
  let localVideoTracks;
  let myPeerConnection;
  const peerConnectionConfig = {
    'iceServers': [
      { 'urls': 'stun:stun.stunprotocol.org:3478' },
      { 'urls': 'stun:stun.l.google.com:19302' },
    ]
  };

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
      sendToServer({
        from: localUserName,
        type: 'join',
        data: localRoom
      })
    }

    socket.onmessage = function (msg) {
      let message = JSON.parse(msg.data)
      console.log(msg)
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
          handleNewICECandidateMessage(message);
          break;
        case "join":
          console.log('2. Join')
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
            // localVideo.src = window.URL.createObjectURL(stream);
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
          console.log(myPeerConnection)
        })
        // .catch(handleGetUserMediaError);
        .catch(handleErrorMessage)
    }
  }

  function handleAnswerMessage(message) {
    console.log("The peer has accepted request");
    myPeerConnection.setRemoteDescription(message.sdp).catch(handleErrorMessage);
    console.log(myPeerConnection)
    console.log(socket)
  }

  function handleNewICECandidateMessage(message) {
    console.log('handleNewICECandidateMEssage')
    let candidate = new RTCIceCandidate(message.candidate);
    console.log("Adding received ICE candidate: " + JSON.stringify(candidate));
    myPeerConnection.addIceCandidate(candidate).catch(handleErrorMessage);
  }

  // #2. RTCPeerConnection 
  function handlePeerConnection(message) {
    console.log('3. handlePeerConnection')
    console.log(message)
    createPeerConnection();
    getMedia(mediaConstraints);
    if (message.data === "true") {
      myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent
    }
  }

  function getMedia(constraints) {
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(getLocalMediaStream).catch(handleGetUserMediaError);
  }

  function getLocalMediaStream(mediaStream) {
    // localStream = mediaStream;
    // localVideo.srcObject = mediaStream;
    // localStream.getTracks().forEach(track => myPeerConnection.addTrack(track, localStream));
  }

  function handleGetUserMediaError(error) {
    console.log('navigator.getUserMedia error: ', error);
    switch (error.name) {
      case "NotFoundError":
        alert("Unable to open your call because no camera and/or microphone were found.");
        break;
      case "SecurityError":
      case "PermissionDeniedError":
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        alert("Error opening your camera and/or microphone: " + error.message);
        break;
    }

    // stop();
  }

  // #2-1. RTCPeerConnection 
  function createPeerConnection() {
    console.log('4. createPeerConnection')
    myPeerConnection = new RTCPeerConnection(peerConnectionConfig)

    // //     dataChannel = myPeerConnection.createDataChannel("dataChannel", {
    //   reliable: true
    // });
    // // creating data channel

    // dataChannel.onerror = function (error) {
    //   console.log("Error occured on datachannel:", error);
    // };

    // // when we receive a message from the other peer, printing it on the console
    // dataChannel.onmessage = function (event) {
    //   console.log("message:", event.data);
    // };

    // dataChannel.onclose = function () {
    //   console.log("data channel is closed");
    // };

    // myPeerConnection.ondatachannel = function (event) {
    //   dataChannel = event.channel;
    // };
    console.log(myPeerConnection)
    console.log(socket)

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
    console.log('Track Event: set stream to remote video element');

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

  const [inputValue, setInputValue] = useState('')
  function handleOnchange(e) {
    setInputValue(e.target.value);
    console.log(inputValue)
  }

  function handleOnClick(event) {
    socket.dataChannel.send(inputValue);

  }

  return (
    <>
      <main className="app__main">

        <video autoPlay playsInline></video>
        <button onClick={handleNegotiationNeededEvent}>offer</button>

        <input value={inputValue} type="text" placeholder="message" onChange={handleOnchange} />
        <button type="button" onClick={handleOnClick}>send</button>
      </main>
    </>
  )
}
