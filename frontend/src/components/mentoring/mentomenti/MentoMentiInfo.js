import React from "react";
import UserInfo from "./UserInfo";
import useCertificate from "../../../use/useCertificate";
import useAxios from "../../../use/useAxios";

export default function MentorMentiInfo() {
  const { loading, data } = useAxios({ url: "/api/mentors" });
  const user = useCertificate();

  return (
    <>
      <div className="mentor__container">
        {data &&
          data.data.statusCode !== 404 &&
          data.data.mentorList.map((mentor) => {
            if (user.loading && user.localUserName != mentor.m_name) {
              return (
                <UserInfo
                  key={mentor.m_id}
                  m_id={mentor.m_id}
                  m_name={mentor.m_name}
                  m_p_intro={mentor.m_p_intro}
                  m_c_number={mentor.m_c_number}
                  mr_score={mentor.mr_score}
                  post_number={mentor.post_number}
                  cm_number={mentor.cm_number}
                />
              );
            }
          })}
      </div>
    </>
  );
}
