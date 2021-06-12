import React from "react"
import PropTypes from "prop-types"
import SolutionComment from "./SolutionComment"
import axios, { post } from "axios"
import '../../styles/Solution.css'

class Solution extends React.Component {
  state = {
    sid: this.props.id,
    isLoading: true,
    comments: [],
    comment_value: '',
    currentUser: ''
  }

  getUserName = async () => {
    await axios.get("/api/auth/me").then((res) => {
      if (res.data.statusCode === 200)
        this.setState({ currentUser: res.data.data.m_name })
    })
  }

  componentDidMount() {
    this.getUserName()
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
        <SolutionComment
          sid={this.state.sid}
          key={this.state.sid}
          currentUser={this.state.currentUser}
        />
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
