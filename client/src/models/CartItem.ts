import { Product } from "./Product";

type CartItem = {
    product: Product;
    chosenAttributes: {[attributeSetId: string]: string};
    quantity: number;
}

export type { CartItem };