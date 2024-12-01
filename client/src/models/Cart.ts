import { CartItem } from './CartItem';
import { Currency } from './Currency';

type Cart = {
    items: CartItem[];
    currency: Currency;
    total: number;
}

export type { Cart };