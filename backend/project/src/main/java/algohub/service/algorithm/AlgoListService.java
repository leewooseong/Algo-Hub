package algohub.service.algorithm;

import algohub.repository.algorithm.AlgoListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AlgoListService {

    private final AlgoListRepo mapper;

    @Autowired
    public AlgoListService(AlgoListRepo mapper) {
        this.mapper = mapper;
    }

    public List<Map<String, Object>> getAlgoList(String a_c_id) {
        return mapper.getAlgoList(a_c_id);
    }
}
