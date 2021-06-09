package algohub.service.algorithm;

import algohub.domain.algorithm.AlgoList;
import algohub.domain.algorithm.AlgorithmInfo;
import algohub.domain.algorithm.SourceComment;
import algohub.repository.algorithm.AlgorithmMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlgorithmService {

    private final AlgorithmMapper mapper;

    @Autowired
    public AlgorithmService(AlgorithmMapper mapper) {
        this.mapper = mapper;
    }

    // 알고리즘 문제 검색
    public List<AlgorithmInfo> searchAlgorithm(String search) throws Exception {
        return mapper.searchAlgorithm(search);
    }

    // 풀이 댓글 작성
    public void writeSourceComment(SourceComment sourceComment) throws Exception {
        mapper.writeSourceComment(sourceComment);
    }

    // 풀이 댓글 조회
    public List<SourceComment> getSourceCommentList(int s_id) throws Exception {
        return mapper.getSourceCommentList(s_id);
    }

    // 풀이 댓글 수정
    public void editSourceComment(SourceComment sourceComment) throws Exception {
        mapper.editSourceComment(sourceComment);
    }

    // 풀이 댓글 삭제
    public void deleteSourceComment(int s_cm_id) throws Exception {
        mapper.deleteSourceComment(s_cm_id);
    }
}
