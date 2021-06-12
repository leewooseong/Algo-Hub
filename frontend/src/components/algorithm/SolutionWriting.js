import React from "react"
import axios, { post } from 'axios'

class SolutionWriting extends React.Component {
  state = {
    a_id: this.props.location.state['a_id'],
    language: '',
    content: '',
    isForm: true,
    currentUser: ''
  }

  getUserName = async () => {
    await axios.get("/api/auth/me").then((res) => {
      if (res.data.statusCode === 200)
        this.setState({ currentUser: res.data.data.m_name })
    })
  }

  handleFormSubmit = (e) => {
    this.setState({ isForm: false })
    e.preventDefault()
    this.addPost().then((response) => {
      alert('작성되었습니다.')
      this.props.history.goBack()
    })
  }

  handleValueChange = (e) => {
    let nextState = {}
    nextState[e.target.name] = e.target.value;
    this.setState(nextState)
  }

  addPost = () => {
    const url = '/api/solution/writing'
    const formData = new FormData();
    formData.append('a_id', this.state.a_id)
    formData.append('code', this.state.content)
    formData.append('language', this.state.language)
    formData.append('m_name', this.state.currentUser)
    return post(url, formData)
  }

  componentDidMount() {
    this.getUserName()
  }

  render() {
    return (
      <main className="App__main">
        <section className="main__section">
          <div className="writing">
            <h2 className="section__title">풀이 등록</h2>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="code" className="writing__label">풀이 소스코드
                <select className="select__language" name="language" id="language" onChange={this.handleValueChange}>
                  <option value="">Select Language</option>
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                </select>
              </label>
              <label htmlFor="content" className="writing__label">내용</label>
              <textarea required className="writing__comment writing__input" name="content" placeholder="내용을 입력하세요." rows="4" onChange={this.handleValueChange}></textarea>
              <button className="writing__btn" type="submit" value="등록">
                등록
              </button>
            </form>
          </div>
        </section>
      </main>
    )
  }
}

export default SolutionWriting