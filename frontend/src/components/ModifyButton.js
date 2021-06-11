import { Link } from "react-router-dom";
import "../styles/ModifyDeleteButton.css";

const ModifyButton = ({ path, id, title, content, page, like, buttonName }) => {
  const ClickModifyButton = () => { };
  return (
    <Link
      to={{
        pathname: path,
        state: {
          id: id,
          title: title,
          content: content,
          like: like,
          page: page,
        },
      }}
    >
      <button className="modifybutton">{buttonName}수정</button>
    </Link>
  );
};

export default ModifyButton;
