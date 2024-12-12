import React, { createRef } from 'react';
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
    private oldNumberOfCartItems: number | null = null;

    constructor(props: any) {
        super(props);
        
        this.state = {
            showCartOverlay: false
        }
    }

    // componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IHeaderState>, snapshot?: any): void {
    //     if (this.oldNumberOfCartItems.current !== this.context.cart.getNumberOfItems()) {
    //         if (this.oldNumberOfCartItems !== -1) {
    //             this.setState({
    //                 showCartOverlay: true
    //             });
    //         }
    //         this.setState({
    //             oldNumberOfCartItems: this.context.cart.getNumberOfItems()
    //         });
    //     }
    // }

    render() {
        return (
            <cartContext.Consumer>
                {
                    (context) => {
                        let numberOfCartItems = 0;
                        if (context) {
                            const cart = context.cart;
                            numberOfCartItems = cart.getNumberOfItems();
                            // this.oldNumberOfCartItems.
                            // set old = new
                            if (this.oldNumberOfCartItems === null) {
                                this.oldNumberOfCartItems = numberOfCartItems;
                            }
                        }
                    
                        return (
                            <header className="header">
                                <NavBar/>

                                <div className="home-button-container">
                                    <NavLink to="/" className="home-button">
                                        <img src={Logo} alt="logo" className="home-button-icon"/>
                                    </NavLink>
                                </div>

                                <div className="cart-button-container">
                                    <button
                                        data-testid='cart-btn'
                                        className={`cart-button ${numberOfCartItems == 0 ? 'disabled' : ''}`}
                                        onClick={
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
                                    </button>
                                    <CartOverlay
                                        // disabled={!this.state.showCartOverlay}
                                        disabled={
                                            (() => {
                                                // console.log('oldNumberOfCartItems', this.oldNumberOfCartItems, 'numberOfCartItems', numberOfCartItems);
                                                if (this.oldNumberOfCartItems !== numberOfCartItems && this.oldNumberOfCartItems !== null) {
                                                    this.oldNumberOfCartItems = numberOfCartItems;

                                                    if (numberOfCartItems === 0) {
                                                        return true;
                                                    }
                                                    return false;
                                                }

                                                return !this.state.showCartOverlay
                                            })()
                                        }
                                        hideOverlay={() => this.setState({showCartOverlay: false})}
                                    />
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