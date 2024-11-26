import React from 'react';
import '../styles/Header.css';

import NavBar from './NavBar';
import CartButton from './CartButton';
import HomeButton from './HomeButton';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <NavBar/>
                <HomeButton/>
                <CartButton/>
            </header>
        );
    }
}

export default Header;