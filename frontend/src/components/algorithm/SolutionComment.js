import axios, { post } from 'axios'
import { useEffect, useState } from 'react'
import Comments from './Comments'
import "../../styles/Comments.css";

export default function SolutionComment({ sid, currentUser }) {
  const [data, setData] = useState('')
  const [comment_value, setCommentValue] = useState('')

  const getComments = async () => {
    await axios.get(`/api/solution/comments/${sid}`).then((res) => {
      setData(res.data.comments)
    });
  }

  const handleValueChange = (e) => {
    setCommentValue(e.target.value)
  }

  const addComments = () => {
    if (comment_value === '') return
    const url = '/api/solution/comments'
    const formData = new FormData();
    formData.append('s_id', sid)
    formData.append('m_name', currentUser)
    formData.append('s_cm_content', comment_value)
    formData.append('s_cm_date', 123123)
    return post(url, formData).then((res) => {
      if (res.data.statusCode === 200) {
        window.location.reload(true);
      }
    })
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <div className="solution__comments">
      <ul className="solution__comment">
        {data &&
          data.map((comment) =>
            <Comments
              id={comment['s_cm_id']}
              key={comment['s_cm_id']}
              name={comment["m_name"]}
              content={comment["s_cm_content"]}
              date={comment["s_cm_date"]}
              like={comment["s_cm_like"]}
              currentUser={currentUser}
            />
          )}
      </ul>
      <div className="comment__writing">
        <input name="comment_value" type="text" className="comment__value" placeholder="내용을 작성하세요." onChange={handleValueChange}></input>
        <button className="comment__btn" onClick={addComments}>등록</button>
      </div>
    </div>
  )
}