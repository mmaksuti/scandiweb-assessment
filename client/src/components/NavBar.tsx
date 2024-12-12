import React, { createRef } from 'react';
import '../styles/NavBar.css';
import { NavLink } from 'react-router-dom';

import { QueryResult } from '@apollo/client';

import withQuery from '../hocs/WithQuery';
import GET_CATEGORIES from '../graphql/GetCategories';
import { Category } from '../models/Category';

class NavBar extends React.Component<QueryResult<any>> {
    private navRef = createRef<HTMLUListElement>();
    private observer: MutationObserver | null = null;

    componentDidMount() {
        this.setupObserver();
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    setupObserver() {
        const nav = this.navRef.current;
        if (nav) {
            this.observer = new MutationObserver(() => {
                this.addDataTestId();
            });

            this.observer.observe(nav, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }
    addDataTestId() {
        const navLinks = this.navRef.current?.querySelectorAll('.navlink');
        if (navLinks) {
            navLinks.forEach((link) => {
                if (link.classList.contains('active')) {
                    link.setAttribute('data-testid', 'active-category-link');
                } else {
                    link.setAttribute('data-testid', 'category-link');
                }
            });
        }
    }

    getCategories() {
        const { loading, error, data } = this.props;

        if (loading) {
            return <></>;
        } else if (error) {
            return <div>Error! {error.message}</div>;
        }

        return data.categories.map((category: Category) => {
            const linkRef = React.createRef<HTMLAnchorElement>();

            return (
                <li key={category.name} className="nav-category">
                    <NavLink ref={linkRef} to={"/" + category.name.toLowerCase()}
                        className={({ isActive }: { isActive: boolean }) =>
                            isActive ||
                            (category.name === "all" &&
                                window.location.pathname === "/"
                            )
                            ? 'navlink active' : 'navlink'}
                    >
                        {category.name}
                    </NavLink>
                </li>
            );
        });
    }

    render() {
        return (
            <nav className="navbar">
                <ul ref={this.navRef}>
                    {this.getCategories()}
                </ul>
            </nav>
        );
    }
}

export default withQuery(NavBar, GET_CATEGORIES);