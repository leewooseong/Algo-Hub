package algohub.domain.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
// 회원 가입 중복 확인 시 사용하는 DTO
public class MemberID {
    private String m_name;
    private String m_email;
}
