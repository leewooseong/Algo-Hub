package algohub.controller.Signaling;

import algohub.domain.Signaling.Room;
import algohub.service.Signaling.CodeReviewService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.swing.text.View;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class CodeReviewController {

    private final CodeReviewService codeReviewService;

    HttpSession session;

    @Autowired
    public CodeReviewController(CodeReviewService codeReviewService) {
        this.codeReviewService = codeReviewService;
    }

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

        Map<String, Object> map = new HashMap<>();
        map.put("chat_id", uuid);
        map.put("statusCode", Response.SC_OK);
        map.put("message", HttpStatus.OK);
        return map;
    }

    @GetMapping("/api/mentors/joinRoom/{m_name}/{uuid}")
    Map<String, Object> joinRoom(@PathVariable("m_name") String m_name,
                                 @PathVariable("uuid") String uuid,
                                 HttpServletRequest request) {

        // 입장하려는 멘티
        HttpSession session = request.getSession();
        String user_name = (String) session.getAttribute("user");

        Map<String, Object> map = new HashMap<>();
        map.put("chat_id", uuid);
        map.put("statusCode", Response.SC_OK);
        map.put("message", HttpStatus.OK);

        return map;
    }
}
