package algohub.service.login;

import algohub.domain.member.MemberLogin;
import algohub.repository.login.LoginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class LoginService {

    private final LoginMapper mapper;

    @Autowired
    public LoginService(LoginMapper mapper) {
        this.mapper = mapper;
    }

    public boolean login(MemberLogin memberLogin, HttpSession session) throws Exception {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        MemberLogin member = mapper.login(memberLogin); // nullable
        if (member == null)
            return false;

        boolean result = encoder.matches(memberLogin.getM_pwd(), member.getM_pwd());

        // 패스워드 일치 여부 판별
        if (result == false) {
            return false;
        } else {
            // 세션 객체에 로그인 유저 저장
            session.setAttribute("user", member.getM_name());
            return true;
        }
    }
}
