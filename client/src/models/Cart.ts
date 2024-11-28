import { CartItem } from './CartItem';

type Cart = {
    items: CartItem[];
    currency: string;
}

export type { Cart };