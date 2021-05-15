package algohub.repository.algorithm;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
@Mapper
public interface AlgoSolutionSaveRepo {
    void setSolution(Map<String, Object> data);
}
