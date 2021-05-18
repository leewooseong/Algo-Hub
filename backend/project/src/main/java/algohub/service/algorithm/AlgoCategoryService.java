package algohub.service.algorithm;

import algohub.domain.algorithm.AlgoCategory;
import algohub.repository.algorithm.AlgoCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlgoCategoryService {

    private final AlgoCategoryRepo mapper;

    @Autowired
    public AlgoCategoryService(AlgoCategoryRepo mapper) {
        this.mapper = mapper;
    }

    public List<AlgoCategory> getAlgoCategory() {
        return mapper.getAlgoCategory();
    }

}
