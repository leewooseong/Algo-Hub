package algohub.repository.Signaling;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
@Mapper
public interface CodeReviewMapper {

    void createRoom(Map<String, String> paramMap);

}
