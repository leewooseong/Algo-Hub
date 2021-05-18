package algohub.repository.algorithm;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

@Repository
@Mapper
public interface AlgoSaveRepo {
    void setAlgoSave(HashMap<String, Object> paramMap);
}
