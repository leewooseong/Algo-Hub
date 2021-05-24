import { useState, useEffect } from "react";

const UserInfo = ({
  m_name,
  m_p_image,
  m_c_number,
  post_number,
  cm_number,
  classname,
}) => {
  return (
    <div className={classname ? classname + "__userinfo" : "default__userinfo"}>
      <img
        className={classname ? classname + "__userimage" : "default__userimage"}
        src={m_p_image}
        alt="default profile image"
      />
      <div
        className={classname ? classname + "__usertext" : "default__usertext"}
      >
        <p
          className={classname ? classname + "__username" : "default__username"}
        >
          {m_name}
        </p>
        <p
          className={
            classname ? classname + "__subscribe" : "default__subscribe"
          }
        >
          구독자 {m_c_number}명
        </p>
        <p
          className={classname ? classname + "__postinfo" : "default__postinfo"}
        >
          게시물: {post_number}개 댓글: {cm_number}개
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
