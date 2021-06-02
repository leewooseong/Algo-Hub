package algohub.socket;

import algohub.domain.Signaling.Room;
import algohub.domain.Signaling.WebSocketMessage;
import algohub.repository.Signaling.CodeReviewMapper;
import algohub.service.Signaling.CodeReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Component
public class SignalHandler extends TextWebSocketHandler {

    @Autowired
    private CodeReviewService codeReviewService;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private Map<String, Room> sessionMap = new HashMap<>();

    // message types, used in signalling:
    // text message
    private static final String MSG_TYPE_TEXT = "text";
    // SDP Offer message
    private static final String MSG_TYPE_OFFER = "offer";
    // SDP Answer message
    private static final String MSG_TYPE_ANSWER = "answer";
    // New ICE Candidate message
    private static final String MSG_TYPE_ICE = "ice";
    // join room data message
    private static final String MSG_TYPE_JOIN = "join";
    // leave room data message
    private static final String MSG_TYPE_LEAVE = "leave";

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sendMessage(session, new WebSocketMessage("Server", MSG_TYPE_JOIN, Boolean.toString(true), null, null));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws Exception {
        try {
            WebSocketMessage message = objectMapper.readValue(textMessage.getPayload(), WebSocketMessage.class);

            String userName = message.getFrom();
            String data = message.getData();

            Room rm = new Room();
            rm.setChat_id(data);

            switch (message.getType()) {
                case MSG_TYPE_TEXT:
                    break;

                case MSG_TYPE_OFFER:
                case MSG_TYPE_ANSWER:
                case MSG_TYPE_ICE:
                    Object candidate = message.getCandidate();
                    Object sdp = message.getSdp();

                    Map<String, WebSocketSession> clients = codeReviewService.getClients(rm);
                    for(Map.Entry<String, WebSocketSession> client : clients.entrySet())  {
                        // send messages to all clients except current user
                        if (!client.getKey().equals(userName)) {
                            // select the same type to resend signal
                            sendMessage(client.getValue(),
                                    new WebSocketMessage(
                                            userName,
                                            message.getType(),
                                            data,
                                            candidate,
                                            sdp));
                        }
                    }
                    break;

                case MSG_TYPE_JOIN:
                    // 사용자 추가
                    codeReviewService.addClient(rm, userName, session);
                    break;

                case MSG_TYPE_LEAVE:
                    codeReviewService.removeClientByName(rm, userName);
                    break;

                default:

            }

        } catch (IOException e) {
            System.out.println("An error occured: " + e.getMessage());
        }
    }

    private void sendMessage(WebSocketSession session, WebSocketMessage message) {
        try {
            String json = objectMapper.writeValueAsString(message);
            session.sendMessage(new TextMessage(json));
        } catch (IOException e) {
            System.out.println("error " + e.getMessage());
        }
    }
}
