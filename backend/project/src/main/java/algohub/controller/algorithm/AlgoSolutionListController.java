package algohub.controller.algorithm;

import algohub.domain.algorithm.AlgoSolutionList;
import algohub.service.algorithm.AlgoSolutionListService;
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
 * API 5번 문제 해설(풀이) 조회
 * 작성자 : 김태영 (2021-05-14)
 * 내용 : 글 작성자 풀이 내용과 글 작성자 포함 풀이 내용을 합쳐서 JSON 반환
 */
@RestController
public class AlgoSolutionListController {

    @Autowired
    AlgoSolutionListService algoSolutionListService;

    @GetMapping("/api/solution/{p_title}/language/{language}")
    Map<String, Object> algoSolution(@PathVariable("p_title") String p_title, @PathVariable("language") String language) throws Exception{
        AlgoSolutionList algoSolutionList = new AlgoSolutionList();
        algoSolutionList.setP_title(p_title);
        algoSolutionList.setLanguage(language);

        List<Map<String, Object>> solutionWriter = algoSolutionListService.getSolutionWriter(algoSolutionList);
        List<Map<String, Object>> solutionList = algoSolutionListService.getSolution(algoSolutionList);
        Map<String, Object> map = new HashMap<>();

        String _p_title = solutionWriter.get(0).get("p_title").toString();
        String _p_link = solutionWriter.get(0).get("p_link").toString();

        for (Map<String, Object> i : solutionWriter) {
            i.remove("p_title");
            i.remove("p_link");
        }

        String _language = solutionList.get(0).get("language").toString();
        map.put("language", _language);

        for (Map<String, Object> i : solutionList) {
            i.remove("language");
        }

        map.put("statusCode", Response.SC_OK);
        map.put("message", HttpStatus.OK);
        map.put("p_title", _p_title);
        map.put("p_link", _p_link);
        map.put("writer", solutionWriter);
        map.put("source", solutionList);

        return map;
    }
}
