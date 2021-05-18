package algohub.service.login;

import algohub.domain.member.MemberLogin;
import algohub.repository.login.LoginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final LoginMapper mapper;

    @Autowired
    public LoginService(LoginMapper mapper) {
        this.mapper = mapper;
    }

    public boolean login(MemberLogin memberLogin) throws Exception {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        MemberLogin member = mapper.login(memberLogin); // nullable
        if (member == null)
            return false;

        boolean result = encoder.matches(memberLogin.getM_pwd(), member.getM_pwd());
        return result;
    }
}
