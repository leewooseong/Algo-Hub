package algohub.controller.member;

import algohub.domain.member.MemberInquiry;
import algohub.domain.member.MemberJoin;
import algohub.domain.member.MemberProfile;
import algohub.service.member.MemberService;
import algohub.api.DefaultRes;
import algohub.api.ResponseMessage;
import algohub.api.StatusCode;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("unchecked")
@RestController
@CrossOrigin(origins = "localhost:8080")
public class MemberController {

    private MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 회원 가입
    @PostMapping("/api/signup")
    public Map<String, Object> registerMember(@ModelAttribute MemberJoin memberJoin) throws Exception {
        boolean state = memberService.insertMember(memberJoin);
        Map<String, Object> responseMap = new HashMap();
        if (state == true) {
            responseMap.put("statusCode", Response.SC_OK);
            responseMap.put("message", "회원 가입 완료");
        } else {
            responseMap.put("statusCode", Response.SC_BAD_REQUEST);
            responseMap.put("message", "이미 존재하는 이메일 또는 이름");
        }
        return responseMap;
    }

    // 회원 조회
    @GetMapping("/api/users/{username}")
    public ResponseEntity getMember(@PathVariable String username) throws Exception {
        MemberInquiry memberInquiry = memberService.getMember(username);
        ResponseEntity responseEntity = new ResponseEntity(DefaultRes.res(
                StatusCode.OK, ResponseMessage.FOUND_USER, memberInquiry), HttpStatus.OK);
        return responseEntity;
    }

    // 회원 프로필 조회
    @GetMapping("/api/profile/{username}")
    public ResponseEntity getMemberProfile(@PathVariable String username) throws Exception {
        MemberProfile memberProfile = memberService.getMemberProfile(username);
        ResponseEntity responseEntity = new ResponseEntity(DefaultRes.res(
                StatusCode.OK, ResponseMessage.READ_USER, memberProfile), HttpStatus.OK);
        return responseEntity;
    }

    // 사용자 인증
    // API 문서에는 없지만 유저 프로필 사진 주소도 가져오도록 했습니다.
    @GetMapping("/api/auth/me")
    public Map<String, Object> getUserData(HttpSession session) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        String user = (String) session.getAttribute("user");
        MemberProfile userData = memberService.getMemberProfile(user);

        if (userData == null) {
            responseMap.put("statusCode", Response.SC_NOT_FOUND);
            responseMap.put("message", "사용자 정보 없음.");
        } else {
            responseMap.put("statusCode", Response.SC_OK);
            responseMap.put("message", "사용자 정보 접근 성공.");
            responseMap.put("data", userData);
        }

        return responseMap;
    }
}
