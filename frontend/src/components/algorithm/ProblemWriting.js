import React from 'react';
import { post } from 'axios'
import '../../styles/ProblemWriting.css'

class ProblemWriting extends React.Component {
  state = {
    title: '',
    link: '',
    category: [],
    categoryCheck: [],
    code: '',
    language: [],
    comment: '',
    isForm: true
  }

  addPost = () => {
    const url = '/api/algorithms/writing'
    const formData = new FormData();
    formData.append('p_title', this.state.title)
    formData.append('p_link', this.state.link)
    formData.append('code', this.state.code)
    formData.append('language', this.state.language)
    formData.append('p_content', this.state.content)
    const categories = this.state.category
    categories.map(category => formData.append('p_category', category))

    return post(url, formData)
  }

  handleFormSubmit = (e) => {
    this.setState({ isForm: false })
    e.preventDefault()
    this.addPost().then((response) => {
      if (response.data.statusCode === 200) {
        alert('등록되었습니다.')
        this.props.history.goBack()
      }
      else {
        alert('실패')
      }
    })
  }

  handleValueChange = (e) => {
    let nextState = {}
    nextState[e.target.name] = e.target.value;
    this.setState(nextState)
  }

  handleListValueChange = (e) => {
    const categories = this.state.category
    categories.includes(e.target.value) ? categories.pop(e.target.value) : categories.push(e.target.value)
    this.setState({ category: categories })
  }

  render() {
    // const id = this.props.location.state.id * 1;
    const isForm = this.state.isForm
    return (
      <main className="App__main">
        <section className="main__section">
          <div className="writing">
            <h2 className="section__title">문제 등록</h2>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="title" className="writing__label">제목</label>
              <input type="text" className="writing__input" name="title" id="title" placeholder="제목을 입력하세요." maxLength="30" onChange={this.handleValueChange} required autoComplete="off" />

              <label htmlFor="link" className="writing__label">문제 링크</label>
              <input type="text" className="writing__input" name="link" placeholder="링크를 입력하세요." onChange={this.handleValueChange} required autoComplete="off" />

              <label htmlFor="category" className="writing__label">문제 분류</label>
              <input type="checkbox" className="writing__checkbox" name="category" id="category__item1" value="그래프" onChange={this.handleListValueChange} />
              <label className="checkbox__label" htmlFor="category__item1">그래프</label>
              <input type="checkbox" className="writing__checkbox" name="category" id="category__item2" value="그리디" onChange={this.handleListValueChange} />
              <label className="checkbox__label" htmlFor="category__item2">그리디</label>
              <input type="checkbox" className="writing__checkbox" name="category" id="category__item3" value="동적 계획법" onChange={this.handleListValueChange} />
              <label className="checkbox__label" htmlFor="category__item3">동적 계획법</label>
              <input type="checkbox" className="writing__checkbox" name="category" id="category__item4" value="문자열" onChange={this.handleListValueChange} />
              <label className="checkbox__label" htmlFor="category__item4">문자열</label>
              <input type="checkbox" className="writing__checkbox" name="category" id="category__item5" value="스택/큐" onChange={this.handleListValueChange} />
              <label className="checkbox__label" htmlFor="category__item5">스택/큐</label>
              <input type="checkbox" className="writing__checkbox" name="category" id="category__item6" value="정렬" onChange={this.handleListValueChange} />
              <label className="checkbox__label" htmlFor="category__item6">정렬</label>
              <input type="checkbox" className="writing__checkbox" name="category" id="category__item7" value="탐색" onChange={this.handleListValueChange} />
              <label className="checkbox__label" htmlFor="category__item7">탐색</label>
              <input type="checkbox" className="writing__checkbox" name="category" id="category__item8" value="해시" onChange={this.handleListValueChange} />
              <label className="checkbox__label" htmlFor="category__item8">해시</label>
              <input type="checkbox" className="writing__checkbox" name="category" id="category__item9" value="힙" onChange={this.handleListValueChange} />
              <label className="checkbox__label" htmlFor="category__item9">힙</label>

              <label htmlFor="code" className="writing__label">풀이 소스코드
                <select className="select__language" name="language" id="language" onChange={this.handleValueChange} required>
                  <option value="">Select Language</option>
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                </select>
              </label>
              <textarea className="writing__comment writing__input" name="code" placeholder="풀이 소스코드를 입력하세요." rows="10" onChange={this.handleValueChange} required></textarea>

              <label htmlFor="content" className="writing__label">내용</label>
              <textarea className="writing__comment writing__input" name="content" placeholder="내용을 입력하세요." rows="4" onChange={this.handleValueChange} required></textarea>

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

export default ProblemWriting