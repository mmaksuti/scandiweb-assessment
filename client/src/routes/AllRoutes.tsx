import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import withQuery from '../hocs/WithQuery';
import GET_CATEGORIES from '../graphql/GetCategories';
import { QueryResult } from '@apollo/client';

class AllRoutes extends React.Component {
    getCategoryRoutes() {
        const { loading, error, data } = this.props as QueryResult<any>;

        if (loading) {
            return <></>;
        }
        else if (error) {
            return <div>Error! {error.message}</div>;
        }
        
        return data.categories.map((category: any) => {
            return (
                <Route path={"/" + category.name} element={<div>PLACEHOLDER: {category.name}</div>}/>
            );
        });
    }

    render() {

        return (
            <Router>
                <Header/>
                <Routes>
                    {this.getCategoryRoutes()}
                </Routes>
            </Router>
        );
    }
}

export default withQuery(AllRoutes, GET_CATEGORIES);