import React from 'react'
import '../../styles/Footer.css'

function Footer() {
  return <footer className="App__footer">
    <span className="service__name">AlgoHub</span>
    <p className="service__content">© 2021 All Rights Reserved.</p>
    <address className="service__adderss">
      경상북도 구미시 거의동 대학로 61
      <br />Tel. (054) 478-7114
    </address>
    <a className="export__link" href="/"><i className="fab fa-facebook" rel="external noreferrer noopener" /></a>
    <a className="export__link" href="http://git.kumoh.ac.kr/20150650/togather" rel="external noreferrer noopener" target="_blank"><i className="fab fa-github" /></a>
  </footer>
}

export default Footer