import MentoContent from "./MentoContent";
import "../../../styles/MentoContentList.css";
import useAxios from "../../../use/useAxios";

function MentoContentList({ page, username }) {
  const mentiViewData = useAxios({ url: `/api/mentor-room/${username}` });

  // page에 맞는 데이터를 분류하여 뿌려주기
  let contentData;
  if (mentiViewData.data && page === "notice") {
    contentData = mentiViewData.data.data.boardData[0][1];
  } else if (mentiViewData.data && page === "curriculum") {
    contentData = mentiViewData.data.data.boardData[1][2];
  } else if (mentiViewData.data && page === "curation") {
    contentData = mentiViewData.data.data.boardData[2][3];
  } else {
    contentData = null;
  }

  // mentipage에선 표시할 수 있는 리스트의 개수가 제한적이기 때문에 적절한 갯수의 리스트를 뿌려준다.
  return (
    // 다른 사용법을 보고 싶다면 ReviewList로...
    <ul className="mentiview__contentlist">
      {contentData &&
        contentData.map((content, index) => {
          let num = 1;
          if (page === "curriculum" || page === "curation") {
            num = 3;
          }
          if (index <= num) {
            return (
              <MentoContent
                key={content.mb_id}
                title={content.mb_title}
                content={content.mb_content}
                date={content.mb_date}
              />
            );
          }
        })}
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
