import React from 'react';

import Routes from "./routes/AllRoutes";
import { ApolloClient, InMemoryCache, ApolloProvider, DefaultOptions } from '@apollo/client';

import { Cart } from './models/Cart';
import { CartContext } from './models/CartContext';
import { Currency } from './models/Currency';

const client = new ApolloClient({
    uri: 'https://mmaksuti.alwaysdata.net/graphql',
    cache: new InMemoryCache({
        // do not normalize AttributeSet objects, because same id does not mean same object
        typePolicies: {
            AttributeSet: {
                keyFields: false,
            },
        },
    })
});

const cartContext = React.createContext<CartContext | null>(null);

interface CartState {
    cart: Cart;
}

class App extends React.Component<any, CartState> {
    constructor(props: any) {
        super(props);

        let cart: Cart;
        if (localStorage.getItem('cart')) {
            const cartData = JSON.parse(localStorage.getItem('cart') as string);
            cart = new Cart(cartData.items, cartData.currency);
        } else {
            cart = new Cart([], { label: 'USD', symbol: '$' } as Currency);
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        this.state = {
            cart: cart
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