import { Cart } from "./Cart";

type CartContext = {
    cart: Cart;
    setCart: (cart: Cart) => void;
    showOverlay: () => void;
}

export type { CartContext };