import React from 'react'
import axios from 'axios'
import Problem from '../algorithm/Problem'
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
    const { isLoading, pcategory, pnumber, problemList } = this.state

    return (
      <main className="App__main">
        {isLoading ? <span className="blind">isLoading..</span> /* 로딩 화면 이후 수정 */ :
          <section className="main__section">
            <h2 className="section__title">{this.props.location.state['pcategory']} ({pnumber ? pnumber : 0})</h2>
            <div className="problemList">
              {problemList && problemList.map((problem, index) =>
                // <Link to={`/category/algorithm/solution/${index + 1}`}>
                <Problem
                  id={problem['a_id']}
                  key={index + 1} /* issue */
                  mname={problem['m_name']}
                  ptitle={problem['p_title']}
                  plink={problem['p_link']}
                  languagelist={problem['language']}
                />
                // </Link>
              )}
            </div>
            <Link
              to={{
                pathname: "/category/algorithm/writing",
                state: {
                  id: this.props.match.params.no,
                },
              }}>
              <button className="">문제 등록</button>
            </Link>
          </section>
        }
      </main>
    )
  }
}

export default ProblemMain