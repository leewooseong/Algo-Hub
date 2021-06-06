package algohub.controller.Mentor;

import algohub.domain.mentor.MentorBoard;
import algohub.domain.mentor.MentorInfo;
import algohub.domain.mentor.MentorReview;
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
        List<Map<Integer, Object>> boardData = service.getMentorPage(m_name);
        responseMap.put("boardData", boardData);
        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "멘토 페이지 조회 성공");
        return responseMap;
    }

    // 멘토 구독 및 취소
    @PostMapping("/api/mentoring/subscribe")
    public Map<String, Object> subscribeMentor(@RequestParam String m_name, HttpSession session) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        boolean state = service.subscribeMentor(m_name, session);

        responseMap.put("statusCode", Response.SC_OK);
        if (state == false) {
            responseMap.put("message", "멘토 구독 취소");
        } else {
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
    public Map<String, Object> mentorReviewWrite(@ModelAttribute MentorReview mentorReview, HttpSession session) {
        Map<String, Object> responseMap = new HashMap<>();
        Map<String, Object> stateMap = service.writeMentorReview(mentorReview, session);
        if (stateMap.get("state").equals(false)) {
            responseMap.put("statusCode", Response.SC_UNAUTHORIZED);
            responseMap.put("message", "구독한 멘토가 아님");
        } else {
            responseMap.put("mr_score", stateMap.get("mentorRate"));
            responseMap.put("statusCode", Response.SC_OK);
            responseMap.put("message", "멘토 후기 등록 완료");
        }
        return responseMap;
    }

    // 멘토 후기 조회
    @GetMapping("/api/mentors/{m_name}/review")
    public Map<String, Object> getMentorReview(@PathVariable String m_name) {
        Map<String, Object> responseMap = new HashMap<>();
        List<MentorReview> reviewList = service.getMentorReviewList(m_name);
        responseMap.put("m_name", m_name);
        responseMap.put("reviewList", reviewList);
        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "멘토 후기 조회 성공.");
        return responseMap;
    }

    // 멘토 게시판 글 수정
    @PutMapping("/api/mentor-board/{mb_id}")
    public Map<String, Object> updateMentorPost(@PathVariable int mb_id, @ModelAttribute MentorBoard mentorBoard,
                                                HttpSession session) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        mentorBoard.setMb_id(mb_id);
        service.updateMentorPost(mentorBoard, session);
        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "멘토 게시글 수정 완료");
        return responseMap;
    }

    // 멘토 게시판 글 삭제
    @DeleteMapping("/api/mentor-board/{mb_id}")
    public Map<String, Object> deleteMentorPost(@PathVariable int mb_id, HttpSession session) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        service.deleteMentorPost(mb_id, session);
        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "멘토 게시글 삭제 완료");
        return responseMap;
    }

    // 멘토 후기 수정
    @PutMapping("/api/mentor/{m_name}/review/{mr_r_id}")
    public Map<String, Object> updateMentorReview(@PathVariable String m_name, @PathVariable int mr_r_id,
                                                  @ModelAttribute MentorReview mentorReview,
                                                  HttpSession session) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        mentorReview.setM_name(m_name);
        mentorReview.setMr_r_id(mr_r_id);
        service.updateMentorReview(mentorReview, session);
        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "멘토 리뷰 수정 완료");
        return responseMap;
    }

    // 멘토 후기 삭제
    @DeleteMapping("/api/mentor/{m_name}/review/{mr_r_id}")
    public Map<String, Object> deleteMentorReview(@PathVariable String m_name, @PathVariable int mr_r_id,
                                                  HttpSession session)
            throws Exception{
        Map<String, Object> responseMap = new HashMap<>();
        service.deleteMentorReview(m_name, mr_r_id, session);
        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "멘토 리뷰 삭제 완료");
        return responseMap;
    }
}
