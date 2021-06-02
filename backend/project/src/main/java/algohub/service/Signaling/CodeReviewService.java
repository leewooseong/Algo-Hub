package algohub.service.Signaling;

import algohub.domain.Signaling.CodeReview;
import algohub.domain.Signaling.Room;
import algohub.repository.Signaling.CodeReviewMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.*;

@Service
public class CodeReviewService {

    private final CodeReviewMapper mapper;
    private final Map<String, WebSocketSession> clients = new HashMap<>();

    Map<String, WebSocketSession> getClients() {
        return clients;
    }

    @Autowired
    public CodeReviewService(CodeReviewMapper mapper) {
        this.mapper = mapper;
    }

    public void createRoom(Map<String, String> paramMap) {
        mapper.createRoom(paramMap);
    }

    public List<CodeReview> searchRoom(String m_name){
        return mapper.searchRoom(m_name);
    }

    public Map<String, WebSocketSession> getClients(final Room room) {
        return Optional.ofNullable(room)
                .map(r -> Collections.unmodifiableMap(r.getClients()))
                .orElse(Collections.emptyMap());
    }

    public WebSocketSession addClient(final Room room, final String name, final WebSocketSession session) {
        return getClients().put(name, session);
    }

    public WebSocketSession removeClientByName(final Room room, final String name) {
        return getClients().remove(name);
    }

}
