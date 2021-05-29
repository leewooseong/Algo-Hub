package algohub.controller.Mentor;

import algohub.domain.mentor.MentorBoard;
import algohub.domain.mentor.MentorInfo;
import algohub.service.mentor.MentorService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
@RestController
@CrossOrigin(origins = "localhost:8080")
public class MentorController {

    private MentorService service;

    @Autowired
    public MentorController(MentorService service) {
        this.service = service;
    }

    // 멘토 신청
    @PutMapping("/api/mentor-request")
    public Map<String, Object> mentorRequest(HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        boolean state = service.mentorRequest(session);
        if (state == false) {
            responseMap.put("statusCode", Response.SC_UNAUTHORIZED);
            responseMap.put("message", "로그인 필요 또는 이미 신청한 회원");
        } else {
            responseMap.put("statusCode", Response.SC_OK);
            responseMap.put("message", "멘토 신청 완료");
        }
        return responseMap;
    }

    // 멘토 목록 조회
    @GetMapping("/api/mentors")
    public Map<String, Object> getMentorList() {
        Map<String, Object> responseMap = new HashMap<>();
        List<MentorInfo> mentorList = service.getMentorList();

        if (mentorList == null || mentorList.isEmpty()) {
            responseMap.put("statusCode", Response.SC_NOT_FOUND);
            responseMap.put("message", "일치하는 정보 없음");
        } else {
            responseMap.put("statusCode", Response.SC_OK);
            responseMap.put("message", "멘토 목록 조회 성공");
            responseMap.put("mentorList", mentorList);
        }
        return responseMap;
    }

    // 멘토 조회
    @GetMapping("/api/mentors/{m_name}")
    public Map<String, Object> getMentor(@PathVariable String m_name) {
        Map<String, Object> responseMap = new HashMap<>();
        MentorInfo mentor = service.getMentor(m_name);
        if (mentor == null) {
            responseMap.put("statusCode", Response.SC_NOT_FOUND);
            responseMap.put("message", "일치하는 정보 없음");
        } else {
            responseMap.put("statusCode", Response.SC_OK);
            responseMap.put("message", "멘토 조회 성공");
            responseMap.put("mentor", mentor);
        }
        return responseMap;
    }

    // 멘토 페이지 조회
    @GetMapping("/api/mentor-room/{m_name}")
    public Map<String, Object> getMentorPage(@PathVariable String m_name) {
        Map<String, Object> responseMap = new HashMap<>();
        List<Map<Integer, Object>> boardDate = service.getMentorPage(m_name);
        responseMap.put("boardData", boardDate);
        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "멘토 페이지 조회 성공");
        return responseMap;
    }

    // 멘토 구독
    @PostMapping("/api/mentoring/subscribe")
    public Map<String, Object> subscribeMentor(@RequestParam String m_name, HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        boolean state = service.subscribeMentor(m_name, session);

        if (state == false) {
            responseMap.put("statusCode", Response.SC_BAD_REQUEST);
            responseMap.put("message", "이미 구독한 멘토");
        } else {
            responseMap.put("statusCode", Response.SC_OK);
            responseMap.put("message", "멘토 구독 완료");
        }
        return responseMap;
    }

    // 멘토 게시판 글 작성
    @PostMapping("/api/mentors/writing")
    public Map<String, Object> mentorBoardWrite(@ModelAttribute MentorBoard mentorBoard, HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        boolean state = service.writeMentorBoard(mentorBoard, session);
        if (state == false) {
            responseMap.put("statusCode", Response.SC_UNAUTHORIZED);
            responseMap.put("message", "멘토 권한 필요");
        } else {
            responseMap.put("statusCode", Response.SC_OK);
            responseMap.put("message", "멘토 게시글 등록 완료");
        }
        return responseMap;
    }

    // 멘토 후기 작성
    @PostMapping("/api/mentors/review")
    public Map<String, Object> mentorReviewWrite(HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "멘토 후기 등록 완료");
        return responseMap;
    }
}
