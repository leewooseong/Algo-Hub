package algohub.repository.algorithm;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface AlgoListRepo {
    List<Map<String, Object>> getAlgoList(String a_c_id);
}
