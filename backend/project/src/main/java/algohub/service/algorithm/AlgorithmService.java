package algohub.service.algorithm;

import algohub.domain.algorithm.AlgoList;
import algohub.domain.algorithm.AlgorithmInfo;
import algohub.repository.algorithm.AlgorithmMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlgorithmService {

    private final AlgorithmMapper mapper;

    @Autowired
    public AlgorithmService(AlgorithmMapper mapper) {
        this.mapper = mapper;
    }

    // 알고리즘 문제 검색
    public List<AlgorithmInfo> searchAlgorithm(String search) throws Exception {
        return mapper.searchAlgorithm(search);
    }

}
