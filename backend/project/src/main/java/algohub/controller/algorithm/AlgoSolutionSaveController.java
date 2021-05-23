package algohub.controller.algorithm;

import algohub.domain.algorithm.AlgoSolutionSave;
import algohub.service.algorithm.AlgoSolutionSaveService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * API 6번 풀이 등록
 * 작성자 : 김태영 (2021-05-11)
 * 내용 : 문제에 대한 풀이 등록
 */
@RestController
public class AlgoSolutionSaveController {

    @Autowired
    AlgoSolutionSaveService algoSolutionSaveService;

    @PostMapping("/api/solution/writing")
    Map<String, Object> setSolution(@ModelAttribute AlgoSolutionSave data, HttpServletRequest request) {

        HttpSession session = request.getSession();
        String m_id = (String) session.getAttribute("user");

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("solutionData", data);
        paramMap.put("current_user", m_id);

        algoSolutionSaveService.setSolution(paramMap);

        Map<String, Object> map = new HashMap<>();
        map.put("statusCode", Response.SC_OK);
        map.put("message", HttpStatus.OK);
        return map;
    }
}
