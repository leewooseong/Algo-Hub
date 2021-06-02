import React from "react"
import { post } from 'axios'

class SolutionWriting extends React.Component {
  state = {
    a_id: this.props.location.state['a_id'],
    // m_name: 'TestUser',
    language: '',
    content: '',
    isForm: true
  }

  handleFormSubmit = (e) => {
    this.setState({ isForm: false })
    e.preventDefault()
    this.addPost().then((response) => {
      console.log(response.data)
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
    // formData.append('m_name', this.state.m_name)
    formData.append('code', this.state.content)
    formData.append('language', this.state.language)

    const config = {
      headers: {
        'content-type': 'text/html'
      }
    }
    return post(url, formData, config)
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
                  <option value="Python">Python</option>
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
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