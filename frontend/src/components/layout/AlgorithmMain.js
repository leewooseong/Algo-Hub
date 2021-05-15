import React from 'react'
import axios from 'axios'
import Category from '../algorithm/Category'
import '../../styles/AlgorithmMain.css'
import { Link } from 'react-router-dom'

class AlgorithmMain extends React.Component {
  state = {
    isLoading: true,
    categories: [],
  };

  getCategories = async () => {
    await axios.get("/api/categories").then((res) => {
      this.setState({
        categories: res["data"],
        isLoading: false,
      })
    })
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    const { isLoading, categories } = this.state;
    return (
      <main className="App__main">
        {isLoading ? (
          <span className="blind">isLoading..</span>
        ) : (
          <section className="main__section">
            <h2 className="section__title">알고리즘</h2>
            <p className="section__detail">
              알고리즘(한국어: Algorithm 앨거리듬, )은 수학과 컴퓨터 과학,
              언어학 또는 관련 분야에서 어떠한 문제를 해결하기 위해 정해진
              일련의 절차나 방법을 공식화한 형태로 표현한 것, 계산을 실행하기
              위한 단계적 절차를 의미한다. 알고리즘은 연산, 데이터 마이닝(기계
              학습) 또는 자동화된 추론을 수행한다. 산법(算法), 셈법, 계산 절차
              등으로 번역되기도 한다.
            </p>
            <article className="categories__container">
              {categories['categories'].map((category, index) =>
                <Link to={{
                  pathname: `/category/algorithm/${index + 1}`,
                  state: {
                    s_id: index,
                    pcategory: category['p_category'],
                  }
                }} key={index}>
                  <Category
                    id={index}
                    key={index} /* issus */
                    category={category['p_category']}
                    numberOfProblems={category['p_number']}
                    content={category['p_content']}
                  />
                </Link>
              )}
            </article>
          </section>
        )}
      </main>
    )
  }
}

export default AlgorithmMain