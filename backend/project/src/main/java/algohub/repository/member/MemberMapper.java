package algohub.repository.member;

import algohub.domain.member.MemberInquiry;
import algohub.domain.member.MemberJoin;
import algohub.domain.member.MemberProfile;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    void insertMember(MemberJoin memberJoin) throws Exception;
    MemberInquiry getMember(String m_name) throws Exception;
    MemberProfile getMemberProfile(String m_name) throws Exception;
}
