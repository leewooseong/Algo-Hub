package algohub.domain.mentor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MentorBoard {
    private int mb_c_id; // 게시글 카테고리
    private int mb_id; // 게시글 번호
    private String mb_title; // 게시글 제목
    private String mb_content; // 게시글 내용
    private String mb_date; // 게시글 작성 시간
}
