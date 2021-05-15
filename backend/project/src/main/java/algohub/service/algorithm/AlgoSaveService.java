package algohub.service.algorithm;

import algohub.repository.algorithm.AlgoSaveRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AlgoSaveService {

    private final AlgoSaveRepo mapper;

    @Autowired
    public AlgoSaveService(AlgoSaveRepo mapper) {
        this.mapper = mapper;
    }

    public void setAlgoSave(HashMap<String, Object> paramMap) {
        mapper.setAlgoSave(paramMap);
    }
}
