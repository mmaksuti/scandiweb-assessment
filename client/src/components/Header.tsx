import React from 'react';
import '../styles/Header.css';

import NavBar from './NavBar';
import CartButton from './CartButton';

import Logo from '../assets/logo.png';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <NavBar/>
                <div className="logo"><img src={Logo} alt="logo" className="logo-image"/></div>
                <CartButton/>
            </header>
        );
    }
}

export default Header;