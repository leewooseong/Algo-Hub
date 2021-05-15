package algohub.service.algorithm;

import algohub.domain.algorithm.AlgoSolutionList;
import algohub.repository.algorithm.AlgoSolutionListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AlgoSolutionListService {

    private final AlgoSolutionListRepo mapper;

    @Autowired
    public AlgoSolutionListService(AlgoSolutionListRepo mapper) {
        this.mapper = mapper;
    }

    public List<Map<String, Object>> getSolutionWriter(AlgoSolutionList algoSolutionList) {
        return mapper.getSolutionWriter(algoSolutionList);
    }

    public List<Map<String, Object>> getSolution(AlgoSolutionList algoSolutionList) {
        return mapper.getSolution(algoSolutionList);
    }
}
