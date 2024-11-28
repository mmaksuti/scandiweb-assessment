import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
    query {
        products {
            id,
            name,
            category,
            prices {
                amount,
                currency {
                    symbol,
                    label
                }
            },
            gallery,
            inStock
        }
    }
`;

export default GET_PRODUCTS;