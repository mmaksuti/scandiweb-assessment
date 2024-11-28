import { gql } from '@apollo/client';

const GET_PRODUCT = gql`
    query getProduct($id: String!) {
        product(id: $id) {
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

export default GET_PRODUCT;