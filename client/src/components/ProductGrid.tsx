import React from "react";
import withQuery from "../hocs/WithQuery";
import GET_PRODUCTS_SHORT from "../graphql/GetProductsShort";
import { QueryResult } from "@apollo/client";
import ProductCard from "./ProductCard";
import { Product } from "../models/Product";

import '../styles/ProductGrid.css';

type IProductGridProps = QueryResult<any> & {
    category: string;
}

class ProductGrid extends React.Component<IProductGridProps> {
    getProducts(category: string) {
        const { loading, error, data } = this.props;

        if (loading) {
            return <></>;
        }
        else if (error) {
            return <div>Error! {error.message}</div>;
        }

        const products = data.products.filter((product: Product) => category === "all" || product.category === category);

        return products.map((product: Product) => {
            return (
                <ProductCard key={product.name} product={product}/>
            );
        });
    }

    render() {
        const { category } = this.props;
        
        const categoryFirstCapital = category.charAt(0).toUpperCase() + category.slice(1);
        
        return (
            <>
                <div className="products-category">{categoryFirstCapital}</div>
                <div className="product-grid">
                    { this.getProducts(category) }
                </div>
            </>
        );
    }
}

export default withQuery(ProductGrid, GET_PRODUCTS_SHORT);