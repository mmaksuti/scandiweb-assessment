import React from 'react';
import '../styles/HomeButton.css';
import Logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

class CartButton extends React.Component {
    render() {
        return (
            <NavLink to="/" className="home-button" ><img src={Logo} alt="logo" className="logo-image"/></NavLink>
        );
    }
}

export default CartButton;