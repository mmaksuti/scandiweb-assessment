import React from "react";
import '../styles/ProductCard.css';
import quickShopIcon from '../assets/quick-shop-icon.svg';
import { Product } from "../models/Product";
import { Price } from "../models/Price";
import { NavLink } from "react-router-dom";
import { CartContext } from "../models/CartContext";
import { cartContext } from "../App";

type IProductCardProps = {
    product: Product;
}

class ProductCard extends React.Component<IProductCardProps> {
    render() {
        return (
            <cartContext.Consumer>
                {
                    (context: CartContext | null) => {
                        let chosenCurrency;
                        if (!context) {
                            chosenCurrency = { label: "USD", symbol: "$" };
                        }
                        else {
                            chosenCurrency = context.cart.currency;
                        }

                        const { product } = this.props;
                        const price = product.prices.find((price: Price) => price.currency.label === chosenCurrency.label);
                        if (!price) {
                            return <></>;
                        }

                        const { id, name, gallery, inStock } = product;
                        const { currency } = price;
                        const kebabCaseProductName = name.toLowerCase().replace(/ /g, "-");

                        return (
                            <div className="product-card" data-testid={`product-${kebabCaseProductName}`}>
                                <NavLink className="product-card-link" to={"/details/" + id}>
                                    <div className="product-thumbnail-container">
                                        <img className={
                                            inStock
                                                ? "product-thumbnail"
                                                : "product-thumbnail out-of-stock-thumbnail"
                                            }
                                            src={gallery[0]}
                                        />
                                        { inStock
                                            ? <div className="quick-shop-button" onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                if (context) {
                                                    context.cart.addItem(product);
                                                    context.setCart(context.cart);
                                                    context.showOverlay();
                                                }
                                            }}>
                                                <img src={quickShopIcon} className="quick-shop-icon"/>
                                            </div>
                                            : <div className="out-of-stock-overlay">
                                                OUT OF STOCK
                                            </div>
                                        }
                                    </div>
                                    <div className="product-name">{name}</div>
                                    <div className={
                                        inStock
                                            ? "product-price"
                                            : "product-price out-of-stock-price"
                                    }>
                                            {currency.symbol}{price.amount}
                                    </div>
                                </NavLink>
                            </div>
                        );
                    }
                }
            </cartContext.Consumer>
        );
    }
}

export default ProductCard;