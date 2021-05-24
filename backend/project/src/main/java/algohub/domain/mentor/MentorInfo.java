package algohub.domain.mentor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MentorInfo {
    private int m_id;
    private String m_name;
    private String m_p_image;
    private String m_p_intro;
    private int m_c_number;
    private double mr_score;
    private int post_number;
    private int cm_number;
}
