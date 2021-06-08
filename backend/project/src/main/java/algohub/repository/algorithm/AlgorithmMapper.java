package algohub.repository.algorithm;

import algohub.domain.algorithm.AlgorithmInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AlgorithmMapper {

    // 알고리즘 문제 검색
    List<AlgorithmInfo> searchAlgorithm(String search) throws Exception;
}
