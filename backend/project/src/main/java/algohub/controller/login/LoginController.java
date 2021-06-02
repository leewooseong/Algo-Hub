package algohub.controller.login;

import algohub.domain.member.MemberLogin;
import algohub.service.login.LoginService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


@SuppressWarnings("unchecked")
@CrossOrigin(origins = "localhost:8080")
@RestController
public class LoginController {

    private final LoginService service;

    @Autowired
    public LoginController(LoginService service) {
        this.service = service;
    }

    // 로그인
    @PostMapping("/api/auth/login")
    public Map<String, Object> login(@ModelAttribute MemberLogin memberLogin, HttpSession session) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        boolean result = service.login(memberLogin, session);
        if (result == false) {
            responseMap.put("statusCode", Response.SC_NOT_FOUND);
            responseMap.put("message", "로그인 실패");
        } else {
            responseMap.put("statusCode", Response.SC_OK);
            responseMap.put("message", "로그인 완료");
        }
        return responseMap;
    }

    @GetMapping("/api/logout")
    public String logOut(HttpSession session) {
        session.invalidate();
        return "로그 아웃.";
    }

    @GetMapping("/api/session")
    public String test(HttpSession session) {
        return (String) session.getAttribute("user");
    }

}
