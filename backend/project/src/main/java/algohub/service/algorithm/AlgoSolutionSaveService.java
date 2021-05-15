package algohub.service.algorithm;

import algohub.repository.algorithm.AlgoSolutionSaveRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AlgoSolutionSaveService {

    private final AlgoSolutionSaveRepo mapper;

    @Autowired
    public AlgoSolutionSaveService(AlgoSolutionSaveRepo mapper) {
        this.mapper = mapper;
    }

    public void setSolution(Map<String, Object> data) {
        mapper.setSolution(data);
    }
}
