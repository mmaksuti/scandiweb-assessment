import '../styles/CartOverlay.css';

import React from "react";
import { cartContext } from '../App';
import { Price } from '../models/Price';
import minusIcon from '../assets/minus.svg';
import plusIcon from '../assets/plus.svg';
import { AttributeSet } from '../models/AttributeSet';
import { CartContext } from '../models/CartContext';
import { Attribute } from '../models/Attribute';
import withMutation from '../hocs/WithMutation';
import CREATE_ORDER from '../graphql/CreateOrder';
import { CartItem } from '../models/CartItem';

interface ICartOverlayProps {
    disabled: boolean;
    setDisabled: () => void;
    mutateFunction: (options?: any) => void;
    data: any;
    loading: boolean;
    error: any;
}

class CartOverlay extends React.Component<ICartOverlayProps> {
    getAttributes(context: CartContext, productIdx: number, attributeSet: AttributeSet) {
        if (attributeSet.type === 'text') {
            return (
                <div className="cart-overlay-attribute-values-text">
                    {attributeSet.items.map((item: Attribute) => {
                        return (
                            <div key={item.id}
                                className={`cart-overlay-text-attribute ${context.cart.items[productIdx].chosenAttributes[attributeSet.id] === item.id ? 'selected' : ''}`}
                                onClick={() =>
                                    {
                                        context.cart.items[productIdx].chosenAttributes[attributeSet.id] = item.id;
                                        context.setCart(context.cart);
                                    }
                                }
                            >
                                {item.value}
                            </div>
                        );
                    })}
                </div>
            );
        } else if (attributeSet.type === 'swatch') {
            return (
                <div className="cart-overlay-attribute-values-swatch">
                    {attributeSet.items.map((item: Attribute) => {
                        return (
                            <div key={item.id}
                                className={`cart-overlay-swatch-attribute ${context.cart.items[productIdx].chosenAttributes[attributeSet.id] === item.id ? 'selected' : ''}`}
                                style={{
                                    backgroundColor: item.value, 
                                }}
                                onClick={() =>
                                    {
                                        context.cart.items[productIdx].chosenAttributes[attributeSet.id] = item.id;
                                        context.setCart(context.cart);
                                    }
                                }
                            >
                            </div>
                        );
                    })}
                </div>
            );
        }
    }
    
    getAttributeSets(context: CartContext, productIdx: number) {
        const product = context.cart.items[productIdx].product;

        return product.attributes.map((attributeSet: AttributeSet) => {
            return (
                <div key={attributeSet.id} className="cart-overlay-attribute">
                    <div className="cart-overlay-attribute-name">{attributeSet.name}:</div>
                    {
                        this.getAttributes(context, productIdx, attributeSet)
                    }
                </div>
            );
        });
    }
    
    render() {
        return (
            <cartContext.Consumer>
                {
                    (context: CartContext | null) => {
                        if (!context) {
                            return <></>;
                        }

                        const { mutateFunction, data, loading, error } = this.props;

                        return (
                            <>
                                <div className={`cart-overlay-background ${this.props.disabled ? 'disabled' : ''}`} onClick={
                                    () => {
                                        this.props.setDisabled();
                                    }
                                }>
                                </div>

                                <div className={`cart-overlay ${this.props.disabled ? 'disabled' : ''}`}>
                                    <b>My Bag,</b> {context.cart.items.length == 1 ? (
                                        <span>{context.cart.items.length} item</span>
                                    ) : (
                                        <span>{context.cart.items.length} items</span>
                                    )}
                                    <div className="cart-overlay-items">
                                        {context.cart.items.map((item, index) => {
                                            const product = item.product;
                                            const chosenCurrency = context.cart.currency.label;
                                            const price = product.prices.find((price: Price) => price.currency.label === chosenCurrency);
                                            if (!price) {
                                                return <></>; // TODO
                                            }
                                            
                                            
                                            if (loading) {
                                                console.log('Placing order...');
                                                return;
                                            }

                                            if (data) {
                                                context.cart.items = [];
                                                context.cart.total = 0;
                                                context.setCart(context.cart);
                                                this.props.setDisabled();
                                                return;
                                            }

                                            return (
                                                <div className="cart-overlay-item" key={index}>
                                                    <div className="cart-overlay-item-details">
                                                        <div className="cart-overlay-item-name">{item.product.name}</div>
                                                        <div className="cart-overlay-item-price">{price.currency.symbol}{price.amount}</div>
                                                        {
                                                            this.getAttributeSets(context, index)
                                                        }
                                                    </div>
                                                    <div className="cart-overlay-quantity-selector">
                                                        <button className="cart-overlay-quantity-selector-button" onClick={() => {
                                                            item.quantity -= 1;
                                                            if (item.quantity <= 0) {
                                                                context.cart.items.splice(index, 1);
                                                                this.props.setDisabled();
                                                            }
                                                            context.cart.total -= price.amount;
                                                            context.cart.total = parseFloat(context.cart.total.toFixed(2));
                                                            context.setCart(context.cart);
                                                        }}>
                                                            <img className="quantity-selector-icon" src={minusIcon}></img>
                                                        </button>
                                                        <div className="cart-overlay-quantity-selector-quantity">{item.quantity}</div>
                                                        <button className="cart-overlay-quantity-selector-button" onClick={() => {
                                                            item.quantity += 1;
                                                            context.cart.total += price.amount;
                                                            context.cart.total = parseFloat(context.cart.total.toFixed(2));
                                                            context.setCart(context.cart);
                                                        }}><img className="quantity-selector-icon" src={plusIcon}></img></button>
                                                    </div>
                                                    <div className="cart-overlay-item-thumbnail">
                                                        <img className="cart-overlay-item-thumbnail-image" src={product.gallery[0]}/> {/* TODO */}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="cart-overlay-total">
                                        <div className="cart-overlay-total-label">Total</div>
                                        <div className="cart-overlay-total-amount">{context.cart.currency.symbol}{context.cart.total}</div>
                                    </div>
                                    { error && <div className="cart-overlay-error">An error occurred. Please try again.</div> }
                                    <button className="cart-overlay-checkout-button" onClick={
                                        () => {
                                            mutateFunction({
                                                variables: {
                                                    createOrderInput: {
                                                        products: context.cart.items.map((item: CartItem) => {
                                                            return {
                                                                productId: item.product.id,
                                                                quantity: item.quantity,
                                                                chosenAttributes: Object.keys(item.chosenAttributes).map((attributeSetId) => {
                                                                    return {
                                                                        attributeSetId: attributeSetId,
                                                                        attributeId: item.chosenAttributes[attributeSetId]
                                                                    };
                                                                })
                                                            };
                                                        }),
                                                        currency: context.cart.currency.label
                                                    }
                                                }
                                            });
                                        }
                                    }>Place order</button>
                                </div>
                            </>
                        );
                    }
                }
            </cartContext.Consumer>
        );
    }
}

export default withMutation(CartOverlay, CREATE_ORDER);