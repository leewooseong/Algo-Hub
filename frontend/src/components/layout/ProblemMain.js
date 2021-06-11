import React from 'react'
import axios from 'axios'
import Problem from '../algorithm/Problem'
import description from '../algorithm/description'
import '../../styles/ProblemMain.css'
import { Link } from 'react-router-dom'

class ProblemMain extends React.Component {
  state = {
    isLoading: true,
    pcategory: '',
    pnumber: 0,
    problemList: [],
    url: '/api/algorithms/' + (window.location.href.split('/').pop()).toString()
  }

  getAlgorithms = async () => {
    await axios.get(this.state.url).then(res => {
      console.log(res)
      this.setState({
        problemList: res['data']['algorithmList'],
        isLoading: false,
        pcategory: res['data']['p_category'],
        pnumber: res['data']['p_number']
      })
    })
  }

  componentDidMount() {
    this.getAlgorithms()
  }

  render() {
    const { isLoading, pnumber, problemList } = this.state
    const categoryID = window.location.href.split('/').pop() - 1
    return (
      <main className="App__main">
        {isLoading ? <span className="blind">isLoading..</span> /* 로딩 화면 이후 수정 */ :
          <section className="main__section">
            <h2 className="section__title">{this.props.location.state['pcategory']} ({pnumber ? pnumber : 0})
            <Link
                to={{
                  pathname: "/category/algorithm/writing",
                  state: {
                    id: this.props.match.params.no,
                  },
                }}>
                <button className="submit__btn">문제 등록</button>
              </Link></h2>
            <p className="section__detail">{description[categoryID]}</p>
            <div className="problemList">
              {problemList && problemList.map((problem, index) =>
                <Problem
                  id={problem['a_id']}
                  key={index + 1} /* issue */
                  mname={problem['m_name']}
                  ptitle={problem['p_title']}
                  plink={problem['p_link']}
                  languagelist={problem['language']}
                />
              )}
            </div>
          </section>
        }
      </main>
    )
  }
}

export default ProblemMain