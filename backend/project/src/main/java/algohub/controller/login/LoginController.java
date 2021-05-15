package algohub.controller.login;

import algohub.api.DefaultRes;
import algohub.api.ResponseMessage;
import algohub.api.StatusCode;
import algohub.domain.member.MemberLogin;
import algohub.service.login.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

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
    public ResponseEntity login(@ModelAttribute MemberLogin memberLogin, HttpSession session) throws Exception {
        boolean result = service.login(memberLogin);
        ResponseEntity responseEntity;
        if (result == false) {
            responseEntity = new ResponseEntity(DefaultRes.res(
                    StatusCode.NOT_FOUND, ResponseMessage.LOGIN_FAIL), HttpStatus.NOT_FOUND);
        } else {
            //session.setAttribute("user", result.getM_email());
            responseEntity = new ResponseEntity(DefaultRes.res(
                    StatusCode.OK, ResponseMessage.LOGIN_SUCCESS), HttpStatus.OK);
        }
        return responseEntity;
    }
}
