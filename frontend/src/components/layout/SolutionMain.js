import React from 'react'
import axios from 'axios'
import Language from '../algorithm/Language'
import Solution from '../algorithm/Solution'
import { Link } from 'react-router-dom'
import '../../styles/SolutionMain.css'

class SolutionMain extends React.Component {
  state = {
    id: this.props.location.state.a_id,
    p_title: this.props.location.state.p_title,
    p_link: this.props.location.state.p_link,
    mname: this.props.location.state.mname,
    language: this.props.location.state.language,

    languagelist: '',
    writer: '',
    source: ''
  };

  getData = async () => {
    const { p_title, language } = this.state
    await axios.get(`/api/solution/${p_title}/language/${language}`).then((res) => {
      this.setState({
        writer: res['data']['writer'][0],
        source: res['data']['source'],
        languagelist: res['data']['language'],
        isLoading: false,
      });
    });
  };

  componentDidMount() {
    this.getData()
  }

  render() {
    const { writer } = this.state;
    return (
      <section className="main__section">
        <h2 className="section__title">
          {this.state.p_title}
          <a href={this.state.p_link}
            target="_blank"
            className="problem__link"
            rel="noreferrer">
            <i className="fas fa-external-link-alt"></i> 문제 이동
          </a>
        </h2>
        <div className="user__info">
          <img
            className="user__image"
            src="https://via.placeholder.com/25x25.jpg"
            alt="profile__image"
          />
          <span className="user__name">{this.state.mname}</span>
          <i className="fas fa-heart"> {writer['s_like']}</i>
          <i className="far fa-heart blind"></i>
        </div>
        <div className="solution__source ">
          <pre>
            <code className={`${this.state.language} writer__codebox hljs`}>
              {writer["code"]}
            </code>
          </pre>
        </div>
        <div className="writer__comment">
          <h3 className="comment__label writer__label">작성자 Comment</h3>
          <p className="writer__content">{writer["p_content"]}</p>
        </div>
        <h3 className="comment__language writer__label">사용 언어</h3>
        <Language languagelist={this.state.language} />
        <Link
          to={{
            pathname: "/category/algorithm/solution/writing",
            state: {
              a_id: this.state.id,
              p_title: this.state.p_title,
              language: this.state.language
            }
          }}
        >
          <button>풀이 등록</button>
        </Link>
        {
          this.state.source && this.state.source.map((data, index) => (
            <Solution
              id={index}
              key={index}
              m_name={data["m_name"]}
              s_cm_like={data["s_like"]}
              code={data["code"]}
              s_cm_content={data["comments"]}
              language={this.state.language}
              p_title={this.state.p_title}
            />
          ))
        }
      </section >
    );
  }
}

export default SolutionMain