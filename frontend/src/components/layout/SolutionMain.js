import React from 'react'
import axios from 'axios'
import Language from '../algorithm/Language'
import Solution from '../algorithm/Solution'
import { Link } from 'react-router-dom'
import '../../styles/SolutionMain.css'

class SolutionMain extends React.Component {
  state = {
    id: this.props.location.state.aid,
    pid: [],
    p_title: this.props.location.state.ptitle,
    p_link: '',
    mname: this.props.location.state.mname,
    language: this.props.location.state.language,
    languagelist: ['C', 'C++', 'Java', 'Python'],
    writer: '',
    source: '',
    loading: false,
    sendData: {}
  };

  getData = async () => {
    const { ptitle, language } = this.props.history.location.state
    await axios.get(`/api/solution/${ptitle}/language/${language}`).then((res) => {
      console.log(Object.keys(res.data.source))
      this.setState({
        pid: res.data.source,
        p_link: res.data.p_link,
        writer: res.data.writer,
        source: res.data.source,
        loading: true,
        sendData: {
          current: {
            a_id: res.data.writer[0]['a_id'],
            p_title: res.data.p_title,
            p_link: res.data.p_link,
            mname: res.data.writer[0]['m_name']
          }
        }
      })
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { writer } = this.state;
    return (
      <section className="main__section">
        {this.state.loading &&
          <>
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
                src="/assets/profileDefaultImage.png"
                alt="profile__image"
              />
              <span className="user__name">{this.state.mname}</span>
              <i className="fas fa-heart"> {writer[0]['s_like']}</i>
              <i className="far fa-heart blind"></i>
            </div>
            <div className="writer__comment">
              <h3 className="comment__label writer__label">작성자 Comment</h3>
              <p className="writer__content">{writer[0]["p_content"]}</p>
            </div>
            <h3 className="comment__language writer__label">사용 언어</h3>
            <Language data={this.state.sendData} />
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
              <button className="submit__btn">풀이 등록</button>
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
          </>
        }
      </section >
    );
  }
}

export default SolutionMain