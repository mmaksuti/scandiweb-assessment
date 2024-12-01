import { Cart } from "./Cart";

type CartContext = {
    cart: Cart;
    setCart: (cart: Cart) => void;
}

export type { CartContext };