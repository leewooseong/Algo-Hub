import { useState, useEffect } from "react";
import MentoContent from "./MentoContent";
import useAxios from "../../../use/useAxios";


function MentoContentList({ contentData }) {

  return (
    //   // 다른 사용법을 보고 싶다면 ReviewList로...
    <ul className="mentiview__contentlist">
      {contentData.map((content) => (
        <MentoContent
          key={content.mb_id}
          title={content.mb_title}
          content={content.mb_content}
          date={content.mb_date}
        />
      ))}
    </ul>
  );
}
// const MentoContentList = ({ contentData }) => {
//   console.log('here' + contentData);
//   return (
//     // 다른 사용법을 보고 싶다면 ReviewList로...
//     <ul className="mentiview__contentlist">
//       {contentData.mb_c_category_list.map((content) => (
//         <MentoContent
//           key={content.mb_id}
//           title={content.mb_title}
//           content={content.mb_content}
//           date={content.mb_date}
//         />
//       ))}
//     </ul>
//   );
// };

export default MentoContentList;
