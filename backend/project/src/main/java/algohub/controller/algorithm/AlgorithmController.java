package algohub.controller.algorithm;

import algohub.domain.algorithm.AlgorithmInfo;
import algohub.service.algorithm.AlgorithmService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
@RestController
@CrossOrigin(origins = "localhost:8080")
public class AlgorithmController {

    private final AlgorithmService service;

    @Autowired
    public AlgorithmController(AlgorithmService service) {
        this.service = service;
    }

    // 문제 검색
    @GetMapping("/api/algorithms/search/{search}")
    public Map<String, Object> searchAlgorithm(@PathVariable String search) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        List<AlgorithmInfo> algorithmList = service.searchAlgorithm(search);

        responseMap.put("algorithmList", algorithmList);
        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "문제 검색 완료");

        return responseMap;
    }
}
