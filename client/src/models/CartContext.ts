import { Cart } from "./Cart";

type CartContext = {
    cart: Cart;
    setCart: (cart: Cart) => void;
    currency: string;
    setCurrency: (currency: string) => void;
}

export type { CartContext };