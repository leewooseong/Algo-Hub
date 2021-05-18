package algohub.repository.login;

import algohub.domain.member.MemberLogin;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
    MemberLogin login(MemberLogin memberLogin) throws Exception;
}
