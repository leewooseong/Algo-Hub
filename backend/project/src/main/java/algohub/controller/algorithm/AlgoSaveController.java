package algohub.controller.algorithm;

import algohub.domain.algorithm.AlgoSave;
import algohub.service.algorithm.AlgoSaveService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.*;

/**
 * API 3번 알고리즘 문제 등록
 * 작성자 : 김태영 (2021-05-05)
 * 내용 : 알고리즘 분류가 N개이기 때문에 분리 후 Map에 파라미터 넣어서 서비스로 인자로 활용
 */
@RestController
public class AlgoSaveController {

    @Autowired
    AlgoSaveService algoSaveService;

    @PostMapping("/api/algorithms/writing")
    Map<String, Object> algoSave(@ModelAttribute AlgoSave param) throws IOException {
        HashMap<String, Object> paramMap = new HashMap<>();
        Map<String, Object> returnCode = new HashMap<>();
        List<String> list = Arrays.asList(param.getP_category().split(","));
        paramMap.put("algosave", param);
        paramMap.put("category", list);
        algoSaveService.setAlgoSave(paramMap);
        returnCode.put("statusCode", Response.SC_OK);
        returnCode.put("message", HttpStatus.OK);
        return returnCode;
    }
}
