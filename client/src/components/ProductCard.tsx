import React from "react";
import '../styles/ProductCard.css';
import addToCartIcon from '../assets/quick-shop-icon.png';
import { Product } from "../models/Product";
import { Price } from "../models/Price";

type IProductProps = {
    product: Product;
}

class ProductCard extends React.Component<IProductProps> {
    render() {
        const { product } = this.props;

        const chosenCurrency = 'USD'; // TODO: don't hardcode this
        const price = product.prices.find((price: Price) => price.currency.label === chosenCurrency);
        if (!price) {
            return <></>;
        }

        const { name, gallery, inStock } = product;
        const { currency } = price;

        return (
            <div className="product-card">
                <div className="product-thumbnail-container">
                    <img className={inStock ? "product-thumbnail" : "product-thumbnail out-of-stock-thumbnail"} src={gallery[0]}/>
                    { inStock ?
                        <div className="quick-shop-button">
                            <img src={addToCartIcon} className="quick-shop-icon"/>
                        </div>
                    :
                        <div className="out-of-stock-overlay">
                            OUT OF STOCK
                        </div>
                    }
                </div>
                <div className="product-name">{name}</div>
                <div className={inStock ? "product-price" : "product-price out-of-stock-price"}>{currency.symbol}{price.amount}</div>
            </div>
        );
    }
}

export default ProductCard;