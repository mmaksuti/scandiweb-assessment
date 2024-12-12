import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Header from '../components/Header';
import withQuery from '../hocs/WithQuery';
import GET_CATEGORIES from '../graphql/GetCategories';
import { QueryResult } from '@apollo/client';
import ProductGrid from '../components/ProductGrid';
import { Category } from '../models/Category';
import ProductDetailsPage from '../components/ProductDetailsPage';

class AllRoutes extends React.Component {
    getCategoryRoutes() {
        const { loading, error, data } = this.props as QueryResult<any>;

        if (loading) {
            return <></>;
        }
        else if (error) {
            return <div>Error! {error.message}</div>;
        }
        
        return data.categories.map((category: Category) => {
            return (
                <Route key={category.name} path={"/" + category.name} element={<ProductGrid category={category.name}/>}/>
            );
        });
    }

    render() {

        return (
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<ProductGrid category={"all"}/>}/>
                    <Route path="/details/:id" element={<ProductDetailsPage/>}/>
                    {this.getCategoryRoutes()}
                    {/* <Route path="*" element={<div>Page not found, <NavLink to="/">go home</NavLink></div>}/> */}
                </Routes>
            </Router>
        );
    }
}

export default withQuery(AllRoutes, GET_CATEGORIES);