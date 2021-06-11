package algohub.repository.Signaling;

import algohub.domain.Signaling.CodeReview;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface CodeReviewMapper {

    void createRoom(Map<String, String> paramMap);
    List<CodeReview> searchRoom(String m_name);
    void exitRoom(String chat_id);
    boolean checkMentor(String m_name);


}
