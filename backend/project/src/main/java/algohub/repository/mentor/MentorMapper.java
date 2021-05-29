package algohub.repository.mentor;

import algohub.domain.mentor.MentorBoard;
import algohub.domain.mentor.MentorInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface MentorMapper {
    String getMemberState(String user);
    String getSubscribeState(@Param("m_name") String m_name, @Param("user") String user);
    void putMemberState(String m_name);
    List<MentorInfo> getMentorList();
    MentorInfo getMentor(String m_name);
    List<MentorBoard> getMentorPage(String m_name);
    void subscribeMentor(Map<String, Object> dataMap);
    void writeMentorBoard(Map<String, Object> dataMap);
    // void writeMentorReview();
}
