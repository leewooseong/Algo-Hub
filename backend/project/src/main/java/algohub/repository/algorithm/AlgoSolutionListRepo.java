package algohub.repository.algorithm;

import algohub.domain.algorithm.AlgoSolutionList;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface AlgoSolutionListRepo{
    List<Map<String, Object>> getSolutionWriter(AlgoSolutionList algoSolutionList);

    List<Map<String, Object>> getSolution(AlgoSolutionList algoSolutionList);
}
