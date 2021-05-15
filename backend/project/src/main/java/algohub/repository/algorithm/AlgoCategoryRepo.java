package algohub.repository.algorithm;

import algohub.domain.algorithm.AlgoCategory;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface AlgoCategoryRepo {
    List<AlgoCategory> getAlgoCategory();
}
