import React from 'react';
import '../styles/CartButton.css';
import cartIcon from '../assets/cart-icon.png';

class CartButton extends React.Component {
    render() {
        return (
            <div className="cart-button"><img src={cartIcon} className="cart-icon"/></div>
        );
    }
}

export default CartButton;