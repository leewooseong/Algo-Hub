import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css'

function Header() {
  return <header className="App__header">
    <div className="App__Logo">
      <span className="blind">Logo</span>
      <i className="fas fa-laptop-code"></i>
      <Link className="test" to="/"><h1 className="App__title">AlgoHub</h1></Link>
    </div>
    <nav className="App__nav">
      <ul className="nav__container">
        <Link to="/category">
          <li className="nav__item"><i className="fas fa-key" />알고리즘</li>
        </Link>
        <Link to="/mentoring">
          <li className="nav__item"><i className="fas fa-user-friends"></i>멘토/멘티</li>
        </Link>
        <Link to="/rank">
          <li className="nav__item"><i className="fas fa-medal"></i>랭킹</li>
        </Link>
        <Link to="/board">
          <li className="nav__item"><i className="fas fa-edit"></i>게시판</li>
        </Link>
      </ul>
    </nav>
  </header>
}

export default Header