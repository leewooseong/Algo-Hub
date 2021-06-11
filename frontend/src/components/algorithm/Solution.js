import React from "react"
import PropTypes from "prop-types"
import Comments from "./Comments"
import axios, { post } from "axios"
import '../../styles/Solution.css'

class Solution extends React.Component {
  state = {
    isLoading: true,
    comments: [],
    comment_value: '',
    currentUser: ''
  }


  getComments = async () => {
    await axios.get(`/api/solution/comments/1`).then((res) => {
      console.log(res.data.comments)
      this.setState({ comments: res.data.comments })
    });
  }


  handleValueChange = (e) => {
    let nextState = {}
    nextState[e.target.name] = e.target.value;
    this.setState(nextState)
  }

  getUserName = async () => {
    await axios.get("/api/auth/me").then((res) => {
      if (res.data.statusCode === 200)
        this.setState({ currentUser: res.data.data.m_name })
    })
  }

  addComments = () => {
    if (this.state.comment_value === '') return
    const url = '/api/solution/comments'
    const formData = new FormData();
    formData.append('s_id', 1)
    formData.append('m_name', this.state.currentUser)
    formData.append('s_cm_content', this.state.comment_value)
    formData.append('s_cm_date', 123123)
    return post(url, formData)
  }

  componentDidMount() {
    this.getUserName()
    this.getComments()
  }

  render() {
    const comments = this.state.comments
    return (
      <div className="solution__container">
        <div className="solution__writer">
          <img src="/assets/profileDefaultImage.png" alt="profile__image" className="user__image" />
          <span className="solution__mname">
            {this.props.m_name} 님의 풀이
            <i className="fas fa-heart"> {this.props.s_cm_like}</i>
          </span>
        </div>
        <div className="solution__source ">
          <pre className="source__container">
            <code className={`${this.props.language} writer__codebox hljs`}>
              {this.props.code}
            </code>
          </pre>
        </div>
        <div className="solution__comments">
          <ul className="solution__comment">
            {comments.map(comment =>
              <Comments
                id={comment['s_cm_id']}
                key={comment['s_cm_id']}
                name={comment["m_name"]}
                content={comment["s_cm_content"]}
                date={comment["s_cm_date"]}
                like={comment["s_cm_like"]}
                currentUser={this.state.currentUser}
              />
            )}
          </ul>
          <div className="comment__writing">
            <input name="comment_value" type="text" placeholder="내용을 작성하세요." onChange={this.handleValueChange}></input>
            <button onClick={this.addComments}>등록</button>
          </div>
        </div>
      </div>
    )
  }
}

Solution.propTypes = {
  id: PropTypes.number.isRequired,
  m_name: PropTypes.string.isRequired,
  s_cm_like: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  s_cm_content: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  p_title: PropTypes.string.isRequired,
}

export default Solution
