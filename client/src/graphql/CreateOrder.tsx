import { gql } from '@apollo/client';

const CREATE_ORDER = gql`
    mutation CreateOrder($createOrderInput: CreateOrderInput!) {
        createOrder(createOrderInput: $createOrderInput) {
            orderTime,
            currency {
                label,
                symbol
            },
            orderItems {
                product {
                    id
                },
                quantity,
                total,
                chosenAttributes {
                    attributeSet {
                        ida
                    },
                    attribute {
                        id
                    }
                }
            }
        }
    }
`;

export default CREATE_ORDER;