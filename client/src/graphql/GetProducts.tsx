import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
    query {
        products {
            id,
            name,
            inStock,
            gallery,
            description,
            category,
            attributes {
                id,
                name,
                type,
                items {
                    displayValue,
                    value,
                    id
                }
            },
            prices {
                amount,
                currency {
                    label,
                    symbol
                }
            },
            brand
        }
    }
`;

export default GET_PRODUCTS;