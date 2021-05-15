package algohub.domain.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberJoin {
    //private int m_id;
    private String m_name;
    private String m_pwd;
    private String m_pwd_;
    private int m_age; // String 으로 변경해야됨
    private String m_tel;
    private String m_email;
    //private int m_c_id;
}
