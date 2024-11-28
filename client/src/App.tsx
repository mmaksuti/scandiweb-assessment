import React from 'react';

import Routes from "./routes/AllRoutes";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { Cart } from './models/Cart';
import { CartContext } from './models/CartContext';

const client = new ApolloClient({
  uri: 'https://mmaksuti.alwaysdata.net/graphql',
  cache: new InMemoryCache()
});

const cartContext = React.createContext<CartContext | null>(null);

interface CartState {
    cart: Cart;
    currency: string;
}

class App extends React.Component<any, CartState> {
    constructor(props: any) {
        super(props);

        let currency: string | null = null;
        if (localStorage.getItem('currency')) {
            currency = localStorage.getItem('currency');
        }
        if (!currency) {
            currency = 'USD';
            localStorage.setItem('currency', currency);
        }

        let cart: Cart;
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart') as string);
        } else {
            cart = {
                items: [],
                currency: currency
            };
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        this.state = {
            cart: cart,
            currency: currency
        };
    }

    render() {
        return (
            <cartContext.Provider value={
                {
                    cart: this.state.cart,
                    setCart: (cart: Cart) => {
                        this.setState({ cart: cart });
                        localStorage.setItem('cart', JSON.stringify(cart));
                    },
                    currency: this.state.currency,
                    setCurrency: (currency: string) => {
                        this.setState({ currency: currency });
                        localStorage.setItem('currency', currency);
                    }
                }
            }>
                <ApolloProvider client={client}>
                    <Routes />
                </ApolloProvider>
            </cartContext.Provider>
        );
    }
}

export { App, cartContext };