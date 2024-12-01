import React from 'react';
import '../styles/Header.css';

import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import cartIcon from '../assets/cart-icon.svg';
import { cartContext } from '../App';
import CartOverlay from './CartOverlay';

interface IHeaderState {
    showCartOverlay: boolean;
}

class Header extends React.Component<any, IHeaderState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showCartOverlay: false
        }
    }

    render() {
        return (
            <cartContext.Consumer>
                {
                    (context) => {
                        let numberOfCartItems = 0;
                        if (context) {
                            const cart = context.cart;
                            numberOfCartItems = cart.items.length;
                        }

                        return (
                            <header className="header">
                                <NavBar/>

                                <div className="home-button-container">
                                    <NavLink to="/" className="home-button" >
                                        <img src={Logo} alt="logo" className="home-button-icon"/>
                                    </NavLink>
                                </div>

                                <div className="cart-button-container">
                                    <div className={`cart-button ${numberOfCartItems == 0 ? 'disabled' : ''}`} onClick={
                                        () => {
                                            this.setState({
                                                showCartOverlay: !this.state.showCartOverlay
                                            });
                                        }
                                    }>
                                        <img src={cartIcon} className="cart-icon"/>
                                        {numberOfCartItems > 0 && (
                                            <div className="cart-item-number">{numberOfCartItems}</div>
                                        )}
                                    </div>
                                    <CartOverlay disabled={!this.state.showCartOverlay} setDisabled={() => this.setState({showCartOverlay: false})}/>
                                </div>
                            </header>
                        );
                    }
            }
            </cartContext.Consumer>
        );
    }
}

export default Header;