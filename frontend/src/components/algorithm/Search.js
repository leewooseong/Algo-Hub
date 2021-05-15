import React from 'react';
import '../../styles/Search.css';

function Search() {
  return <div className="search">
    <i class="fas fa-search"></i>
    <input className="search__text" type="text" placeholder="Search..."></input>
  </div>
}

export default Search