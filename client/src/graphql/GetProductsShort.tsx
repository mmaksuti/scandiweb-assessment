import { gql } from '@apollo/client';

const GET_PRODUCTS_SHORT = gql`
    query {
        products {
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

export default GET_PRODUCTS_SHORT;