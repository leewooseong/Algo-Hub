package algohub.service.mentor;

import algohub.domain.mentor.MemberSubscribe;
import algohub.domain.mentor.MentorBoard;
import algohub.domain.mentor.MentorInfo;
import algohub.domain.mentor.MentorReview;
import algohub.repository.mentor.MentorMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.*;

@Service
public class MentorService {

    private MentorMapper mapper;

    @Autowired
    public MentorService(MentorMapper mapper) {
        this.mapper = mapper;
    }

    // 멘토 신청 (중복 신청 방지 수정 완료)
    public boolean mentorRequest(HttpSession session) {
        String user = (String) session.getAttribute("user");
        String userState = mapper.getMemberState(user);

        if (userState.equals("Y") || user == null) {
            return false;
        } else {
            mapper.putMemberState(user);
            return true;
        }
    }

    // 멘토 목록 조회
    public List<MentorInfo> getMentorList() {
        return mapper.getMentorList();
    }

    // 멘토 조회
    public MentorInfo getMentor(String m_name) {
        return mapper.getMentor(m_name);
    }

    // 멘토 페이지 조회
    public List<Map<Integer, Object>> getMentorPage(String m_name) {
        List<MentorBoard> mentorBoards =  mapper.getMentorPage(m_name);

        List<Map<Integer, Object>> boardData = new ArrayList<>();
        List<MentorBoard> boards1 = new ArrayList<>();
        List<MentorBoard> boards2 = new ArrayList<>();
        List<MentorBoard> boards3= new ArrayList<>();
        Map<Integer, Object> category1 = new HashMap<>();
        Map<Integer, Object> category2 = new HashMap<>();
        Map<Integer, Object> category3 = new HashMap<>();

        Iterator<MentorBoard> iterator = mentorBoards.iterator();
        while (iterator.hasNext()) {
            MentorBoard itBoard = iterator.next();
            if (itBoard.getMb_c_id() == 1) {
                boards1.add(itBoard);
            } else if (itBoard.getMb_c_id() == 2) {
                boards2.add(itBoard);
            } else {
                boards3.add(itBoard);
            }
        }

        category1.put(1, boards1);
        category2.put(2, boards2);
        category3.put(3, boards3);
        boardData.add(category1);
        boardData.add(category2);
        boardData.add(category3);

        return boardData;
    }

    // 멘토 구독 및 취소
    public boolean subscribeMentor(String m_name, HttpSession session) throws Exception {
        String user = (String) session.getAttribute("user");
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("m_name", m_name);
        dataMap.put("user", user);

        String subscribeState = mapper.getSubscribeState(m_name, user);
        if (subscribeState != null) {
            mapper.cancelMentorSubscription(dataMap);
            return false;
        } else {
            mapper.subscribeMentor(dataMap);
            return true;
        }
    }

    // 멘토 게시판 글쓰기
    public boolean writeMentorBoard(MentorBoard mentorBoard, HttpSession session) {
        String user = (String) session.getAttribute("user");
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("mentorBoard", mentorBoard);
        dataMap.put("user", user);
        String memberState = mapper.getMemberState(user);
        if (memberState.equals("N") || memberState == null) {
            return false;
        }

        mapper.writeMentorBoard(dataMap);
        return true;
    }

    // 멘토 후기 작성
    public Map<String, Object> writeMentorReview(MentorReview mentorReview, HttpSession session) {
        String user = (String) session.getAttribute("user");
        Map<String, Object> dataMap = new HashMap<>();
        Map<String, Object> responseMap = new HashMap<>();
        dataMap.put("mentorReview", mentorReview);
        dataMap.put("user", user);
        MemberSubscribe memberSubscribe = mapper.getMemberSubscribe(dataMap);
        if (memberSubscribe == null) {
            responseMap.put("state", false);
            return responseMap;
        }
        mapper.writeMentorReview(dataMap);
        String mentorRate = mapper.getMentorRate(mentorReview.getM_name());
        responseMap.put("mentorRate", mentorRate);
        responseMap.put("state", true);
        return responseMap;
    }

    // 멘토 후기 조회
    public List<MentorReview> getMentorReviewList(String m_name) {
        return mapper.getMentorReviewList(m_name);
    }

    // 멘토 페이지 게시글 수정
    public void updateMentorPost(MentorBoard mentorBoard, HttpSession session) throws Exception {
        String user = (String) session.getAttribute("user");
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("mentorBoard", mentorBoard);
        dataMap.put("user", user);
        mapper.updateMentorPost(dataMap);
    }

    // 멘토 페이지 게시글 삭제
    public void deleteMentorPost(int mb_id, HttpSession session) throws Exception {
        mapper.deleteMentorPost(mb_id);
    }

    // 멘토 리뷰 수정
    public void updateMentorReview(MentorReview mentorReview, HttpSession session) throws Exception {
        String user = (String) session.getAttribute("user");
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("mentorReview", mentorReview);
        dataMap.put("user", user);
        mapper.updateMentorReview(dataMap);
        mapper.updateMentorRate(mentorReview.getM_name());
    }

    // 멘토 리뷰 삭제
    public void deleteMentorReview(String m_name, int mr_r_id, HttpSession session) throws Exception {
        mapper.deleteMentorReview(mr_r_id);
        mapper.updateMentorRate(m_name);
    }

    // 구독한 멘토 조회
    public List<String> getSubsInfoList(int m_id) throws Exception {
        return mapper.getSubsInfoList(m_id);
    }
}
