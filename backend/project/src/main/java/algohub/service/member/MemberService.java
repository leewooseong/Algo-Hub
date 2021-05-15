package algohub.service.member;

import algohub.domain.member.MemberInquiry;
import algohub.domain.member.MemberJoin;
import algohub.domain.member.MemberProfile;
import algohub.repository.member.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberMapper mapper;

    @Autowired
    public MemberService(MemberMapper mapper) {
        this.mapper = mapper;
    }

    // 회원 가입
    public void insertMember(MemberJoin memberJoin) throws Exception {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String securePw = encoder.encode(memberJoin.getM_pwd());
        memberJoin.setM_pwd(securePw);
        mapper.insertMember(memberJoin);
    }

    // 회원 조회
    public MemberInquiry getMember(String m_name) throws Exception {
        return mapper.getMember(m_name);
    }

    // 회원 프로필 조회
    public MemberProfile getMemberProfile(String m_name) throws Exception {
        return mapper.getMemberProfile(m_name);
    }
}
