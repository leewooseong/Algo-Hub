package algohub.domain.Signaling;

import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

public class Room {

    private String chat_id;

    // sockets by user names
    private final Map<String, WebSocketSession> clients = new HashMap<>();

    public Room() {
        this.chat_id = UUID.randomUUID().toString();
    }

    public Room(String data) {
        this.chat_id = data;
    }

    public String getChat_id() {
        return chat_id;
    }

    public void setChat_id(String chat_id) {
        this.chat_id = chat_id;
    }

    public Map<String, WebSocketSession> getClients() {
        return clients;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final Room room = (Room) o;
        return Objects.equals(getChat_id(), room.getChat_id()) &&
                Objects.equals(getClients(), room.getClients());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getChat_id(), getClients());
    }


}
