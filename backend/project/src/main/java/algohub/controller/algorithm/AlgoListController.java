package algohub.controller.algorithm;

import algohub.service.algorithm.AlgoListService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API 2번 알고리즘 문제 조회
 * 작성자 : 김태영 (2021-05-05)
 * 내용 : 알고리즘 문제 조회
 */
@RestController
public class AlgoListController {

    @Autowired
    AlgoListService algoListService;

    @GetMapping("/api/algorithms/{a_c_id}")
    public Map<String, Object> algorithms(@PathVariable("a_c_id") String a_c_id) {
        List<Map<String, Object>> algoList = algoListService.getAlgoList(a_c_id);
        Map<String, Object> map = new HashMap<>();
        if(!algoList.isEmpty()) {
            String p_category = algoList.get(0).get("p_category").toString();
            int p_number = Integer.parseInt(algoList.get(0).get("p_number").toString());
            for (Map<String, Object> i : algoList) {
                i.remove("p_category");
                i.remove("p_number");
            }
            map.put("statusCode", Response.SC_OK);
            map.put("message", HttpStatus.OK);
            map.put("p_category", p_category);
            map.put("p_number", p_number);
            map.put("algorithmList", algoList);
        }
        return map;
    }
}
