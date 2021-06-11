import axios from "axios";
import useConfirm from "../use/useConfirm";
import "../styles/ModifyDeleteButton.css";

const DeleteButton = ({ id, m_name, page, buttonName }) => {
  // 보드의 게시물 삭제
  const doDeletingBoard = () => {
    const formData = new FormData();
    formData.append("mb_id", id);
    axios
      .delete(`/api/mentor-board/${id}`, formData)
      .then((res) => {
        alert("삭제 완료");
        window.location.reload(true);
      })
      .catch((error) => {
        alert("삭제 실패");
      });
  };

  // 리뷰의 게시물 삭제
  const doDeletingReview = () => {
    const formData = new FormData();
    formData.append("m_name", m_name);
    formData.append("mb_r_id", id);
    axios
      .delete(`/api/mentor/${m_name}/review/${id}`, formData)
      .then((res) => {
        alert("삭제 완료");
        window.location.reload(true);
      })
      .catch((error) => {
        alert("삭제 실패");
      });
  };

  const doNotDeleting = () => {
    // do nothing..
  };

  const confirmDeleteBoard = useConfirm(
    "게시물을 삭제하시겠습니까?",
    doDeletingBoard,
    doNotDeleting
  );

  const confirmDeleteReview = useConfirm(
    "게시물을 삭제하시겠습니까?",
    doDeletingReview,
    doNotDeleting
  );
  const clickHandle = () => {
    // 데이터 생성 & 요청 전송
    if (page == "board") {
      confirmDeleteBoard();
    } else if (page == "review") {
      confirmDeleteReview();
    }
  };

  return (
    <button onClick={clickHandle} className="deletebutton">
      {buttonName}삭제
    </button>
  );
};

export default DeleteButton;
