package algohub.domain.algorithm;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SourceComment {
    private int s_cm_id;         // 댓글 번호
    private int s_id;            // 풀이 번호
    private String m_name;       // 작성자 이름
    private String s_cm_content; // 댓글 내용
    private String s_cm_date;    // 댓글 작성 시간
    private String m_p_image;    // 작성자 프로필 이미지
    private int s_cm_like;       // 댓글 추천 수
}