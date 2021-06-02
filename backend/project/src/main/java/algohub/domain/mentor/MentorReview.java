package algohub.domain.mentor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MentorReview {
    private int mr_r_id; // 리뷰 아이디
    private String m_name; // 리뷰 작성자 이름 (m_p_id)
    private double mr_r_like; // 멘토 별점
    private String mr_r_content; // 리뷰 내용
    private String mr_r_date; // 리뷰 등록 시간
}
