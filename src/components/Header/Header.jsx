import React from 'react';
import logo from '../../assets/math-processor-th.png';
import './Header.css';

const Header = () => {
  return (
    <div className="logo-div">
      <img className="logo" alt='logo' src={logo}/>
      <h2 className="title">Zoom Chat Participation Counter</h2>
    </div>
  )
}

export default Header
