package algohub.controller.member;

import algohub.domain.member.MemberInquiry;
import algohub.domain.member.MemberJoin;
import algohub.domain.member.MemberProfile;
import algohub.service.member.MemberService;
import algohub.api.DefaultRes;
import algohub.api.ResponseMessage;
import algohub.api.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity registerMember(@ModelAttribute MemberJoin memberJoin) throws Exception {
        memberService.insertMember(memberJoin);
        ResponseEntity responseEntity = new ResponseEntity(DefaultRes.res(
                StatusCode.OK, ResponseMessage.CREATED_USER), HttpStatus.OK);
        return responseEntity;
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
}
