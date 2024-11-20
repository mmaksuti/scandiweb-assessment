import React from 'react';
import '../styles/NavBar.css';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <li className="nav-category"><NavLink to="/" className={({ isActive }) => {
                        return isActive ? "navlink active" : "navlink";
  }}>ALL</NavLink></li>
                    <li className="nav-category"><NavLink to="/clothes" className={({ isActive }) => {
                        return isActive ? "navlink active" : "navlink";
  }}>CLOTHES</NavLink></li>
                    <li className="nav-category"><NavLink to="/tech" className={({ isActive }) => {
                        return isActive ? "navlink active" : "navlink";
  }}>TECH</NavLink></li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;