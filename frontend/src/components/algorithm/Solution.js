import React from "react"
import PropTypes from "prop-types"
import Comments from "./Comments"
// import axios from "axios"
import '../../styles/Solution.css'

class Solution extends React.Component {
  state = {
    isLoading: true,
    comments: [],
  }

  getComments = async () => {
    // await axios.get("/api/solution/comments").then((res) => {
    //   this.setState({ comments: res["data"]["comment"], isLoading: false });
    // });
    const comments = [
      {
        s_cm_id: 1,
        m_name: "안녕",
        s_cm_content: "대박",
        s_cm_date: "16362342431",
        s_cm_like: 12,
      },
      {
        s_cm_id: 2,
        m_name: "Alg2",
        s_cm_content: "aaaaasdgasdgnasdnkganksdgwoegbjzx zksdgabudjdgnjagb",
        s_cm_date: "16362342431",
        s_cm_like: 11,
      },
      {
        s_cm_id: 3,
        m_name: "AlgoMaster3",
        s_cm_content: "와우",
        s_cm_date: "16362342431",
        s_cm_like: 10,
      },
    ]
    this.setState({ comments })
  }

  componentDidMount() {
    this.getComments()
  }

  render() {
    const comments = this.state.comments
    return (
      <div className="solution__container">
        <div className="solution__writer">
          <img src="https://via.placeholder.com/20x20.jpg" alt="profile__image" className="user__image" />
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
              />
            )}
          </ul>
          <div className="comment__writing">
            <input type="text" placeholder="내용을 작성하세요."></input>
            <button>등록</button>
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
