package algohub.controller.algorithm;

import algohub.domain.algorithm.AlgorithmInfo;
import algohub.domain.algorithm.SourceComment;
import algohub.service.algorithm.AlgorithmService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    // 풀이 댓글 작성
    @PostMapping("/api/solution/comments")
    public Map<String, Object> writeSourceComment(@ModelAttribute SourceComment sourceComment) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        service.writeSourceComment(sourceComment);

        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "댓글 작성 완료");

        return responseMap;
    }

    // 풀이 댓글 조회
    @GetMapping("/api/solution/comments/{s_id}")
    public Map<String, Object> getSourceCommentList(@PathVariable int s_id) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        List<SourceComment> sourceComments = service.getSourceCommentList(s_id);

        responseMap.put("comments", sourceComments);
        responseMap.put("statusCode", Response.SC_OK);
        responseMap.put("message", "댓글 조회 완료");

        return responseMap;
    }

    // 풀이 댓글 수정

    // 풀이 댓글 삭제

    // 추천 수 갱신
}
