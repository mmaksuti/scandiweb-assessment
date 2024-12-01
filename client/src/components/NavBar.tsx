import React from 'react';
import '../styles/NavBar.css';
import { NavLink } from 'react-router-dom';

import { QueryResult } from '@apollo/client';

import withQuery from '../hocs/WithQuery';
import GET_CATEGORIES from '../graphql/GetCategories';
import { Category } from '../models/Category';

class NavBar extends React.Component<QueryResult<any>> {
    getCategories() {
        const { loading, error, data } = this.props;

        if (loading) {
            return <></>;
        } else if (error) {
            return <div>Error! {error.message}</div>;
        }

        return data.categories.map((category: Category) => {
            return (
                <li key={category.name} className="nav-category">
                    <NavLink to={"/" + category.name.toLowerCase()} className={`navlink {isActive ? 'active' : ''}`}>
                        {category.name}
                    </NavLink>
                </li>
            );
        });
    }

    render() {
        return (
            <nav className="navbar">
                <ul>
                    {this.getCategories()}
                </ul>
            </nav>
        );
    }
}

export default withQuery(NavBar, GET_CATEGORIES);