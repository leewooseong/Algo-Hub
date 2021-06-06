package algohub.repository.mentor;

import algohub.domain.mentor.MentorBoard;
import algohub.domain.mentor.MentorInfo;
import algohub.domain.mentor.MemberSubscribe;
import algohub.domain.mentor.MentorReview;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface MentorMapper {
    // 본인 확인 (접속중인 유저의 m_p_id 가져오기)
    String findUserID(String user);

    String getMemberState(String user);
    String getSubscribeState(@Param("m_name") String m_name, @Param("user") String user);
    void putMemberState(String m_name);
    List<MentorInfo> getMentorList();
    MentorInfo getMentor(String m_name);
    List<MentorBoard> getMentorPage(String m_name);

    // 멘토 구독
    void subscribeMentor(Map<String, Object> dataMap) throws Exception;

    // 멘토 구독 취소
    void cancelMentorSubscription(Map<String, Object> dataMap) throws Exception;

    void writeMentorBoard(Map<String, Object> dataMap);
    void writeMentorReview(Map<String, Object> dataMap);
    MemberSubscribe getMemberSubscribe(Map<String, Object> dataMap);
    List<MentorReview> getMentorReviewList(String m_name);
    String getMentorRate(String m_name);

    // 멘토 게시글 수정
    void updateMentorPost(Map<String, Object> dataMap) throws Exception;

    // 멘토 게시글 삭제
    void deleteMentorPost(int mb_id) throws Exception;

    // 멘토 리뷰 수정
    void updateMentorReview(Map<String, Object> dataMap) throws Exception;

    // 멘토 리뷰 삭제
    void deleteMentorReview(int mr_r_id) throws Exception;

    // 멘토 평점 갱신
    void updateMentorRate(String m_name) throws Exception;
}
