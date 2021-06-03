package algohub.controller.Signaling;

import algohub.domain.Signaling.CodeReview;
import algohub.domain.Signaling.Room;
import algohub.service.Signaling.CodeReviewService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.socket.WebSocketSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.swing.text.View;
import java.util.*;

@RestController
public class CodeReviewController {

    private final CodeReviewService codeReviewService;

    HttpSession session;

    @Autowired
    public CodeReviewController(CodeReviewService codeReviewService) {
        this.codeReviewService = codeReviewService;
    }

    // 채팅방 생성
    @PostMapping("/api/mentors/createRoom")
    Map<String, Object> createRoom(HttpServletRequest request) {

        HttpSession session = request.getSession();
        String user_name = (String) session.getAttribute("user");

        Room rm = new Room();
        String uuid = rm.getChat_id();

        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("uuid", uuid);
        paramMap.put("m_name", user_name);
        codeReviewService.createRoom(paramMap);
        codeReviewService.addRoom(new Room(uuid));

        Map<String, Object> map = new HashMap<>();
        map.put("chat_id", uuid);
        map.put("statusCode", Response.SC_OK);
        map.put("message", HttpStatus.OK);
        return map;
    }

    // 채팅방 입장
    @GetMapping("/api/mentors/joinRoom/{m_name}/{uuid}")
    Map<String, Object> joinRoom(@PathVariable("m_name") String m_name,
                                 @PathVariable("uuid") String uuid,
                                 HttpServletRequest request) {

        // 입장하려는 멘티
        HttpSession session = request.getSession();
        String user_name = (String) session.getAttribute("user");

        Map<String, Object> map = new HashMap<>();
        List<CodeReview> codeReviews = codeReviewService.searchRoom(m_name);
        for (CodeReview codeReview : codeReviews) {
            map.put("chat_id", codeReview.getChat_id());
            map.put("chat_activation", codeReview.getChat_activation());
            map.put("m_name", codeReview.getM_name());
        }

        map.put("statusCode", Response.SC_OK);
        map.put("message", HttpStatus.OK);

        return map;
    }

    // 채팅방 조회
    @GetMapping("/api/mentors/chatting/{m_name}")
    Map<String, Object> chatting(@PathVariable("m_name") String m_name) {

        Map<String, Object> map = new HashMap<>();
        List<CodeReview> codeReviews = codeReviewService.searchRoom(m_name);
        for (CodeReview codeReview : codeReviews) {
            map.put("chat_id", codeReview.getChat_id());
            map.put("chat_activation", codeReview.getChat_activation());
            map.put("m_name", codeReview.getM_name());

            Map<String, WebSocketSession> clients = codeReviewService.getClients(
                    codeReviewService.findRoomByStringId(codeReview.getChat_id()).orElse(null));
            map.put("user_list", clients.keySet());
        }

        map.put("statusCode", Response.SC_OK);
        map.put("message", HttpStatus.OK);

        return map;
    }

    // 채팅방 나가기
    @PostMapping("/api/mentors/exitRoom/{m_name}/{uuid}")
    Map<String, Object> exitRoom(@PathVariable("uuid") String chat_id,
                                 @PathVariable("m_name") String m_name,
                                 HttpServletRequest request){

        // 멘토이면
        HttpSession session = request.getSession();
        String user_name = (String) session.getAttribute("user");

        if(user_name.equals(m_name)) {
            codeReviewService.exitRoom(chat_id);
            codeReviewService.deleteRoom(chat_id);
        }
        else {
            // 멘티이면
            codeReviewService.removeClientByName(
                    Objects.requireNonNull(codeReviewService.findRoomByStringId(chat_id).orElse(null)),
                    user_name
            );
        }

        Map<String, Object> map = new HashMap<>();
        map.put("statusCode", Response.SC_OK);
        map.put("message", HttpStatus.OK);

        return map;
    }
}
