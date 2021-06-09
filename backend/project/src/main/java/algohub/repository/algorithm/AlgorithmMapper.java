package algohub.repository.algorithm;

import algohub.domain.algorithm.AlgorithmInfo;
import algohub.domain.algorithm.SourceComment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AlgorithmMapper {

    // 알고리즘 문제 검색
    List<AlgorithmInfo> searchAlgorithm(String search) throws Exception;

    // 풀이 댓글 작성
    void writeSourceComment(SourceComment sourceComment) throws Exception;

    // 풀이 댓글 조회
    List<SourceComment> getSourceCommentList(int s_id) throws Exception;


}
