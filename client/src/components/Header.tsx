import React from 'react';
import '../styles/Header.css';

import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
import cartIcon from '../assets/cart-icon.png';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <NavBar/>

                <NavLink to="/" className="home-button" >
                    <img src={Logo} alt="logo" className="logo-image"/>
                </NavLink>

                <div className="cart-button disabled">
                    <img src={cartIcon} className="cart-icon"/>
                </div>
            </header>
        );
    }
}

export default Header;