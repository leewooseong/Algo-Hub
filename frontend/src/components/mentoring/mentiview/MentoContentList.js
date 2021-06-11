import MentoContent from "./MentoContent";
import "../../../styles/MentoContentList.css";
import useAxios from "../../../use/useAxios";

function MentoContentList({ page, contentData, detail, mentorvalidation }) {
  // mentipage에선 표시할 수 있는 리스트의 개수가 제한적이기 때문에 적절한 갯수의 리스트를 뿌려준다.
  return (
    // 다른 사용법을 보고 싶다면 ReviewList로...
    <ul
      className={
        detail ? "mentiview__detailcontentlist" : "mentiview__contentlist"
      }
    >
      {contentData &&
        contentData.map((content, index) => {
          let num;
          // 멘토 페이지에선 보여지는 게시글을 분류마다 6개로 제한
          if (!detail) {
            num = 6;
            if (index < num) {
              return (
                <MentoContent
                  key={content.mb_id}
                  id={content.mb_id}
                  title={content.mb_title}
                  content={content.mb_content}
                  date={content.mb_date}
                  page={page}
                  detail={detail}
                />
              );
            }
          }
          // 게시글 상세페이지에선 모든 게시글 보여주기
          else {
            return (
              <MentoContent
                key={content.mb_id}
                id={content.mb_id}
                title={content.mb_title}
                content={content.mb_content}
                date={content.mb_date}
                page={page}
                detail={detail}
                mentorvalidation={mentorvalidation}
              />
            );
          }
        })}
    </ul>
  );
}

export default MentoContentList;
