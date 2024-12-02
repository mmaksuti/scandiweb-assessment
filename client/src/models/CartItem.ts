import { Product } from "./Product";

type CartItem = {
    product: Product;
    chosenAttributes: ChosenAttributes;
    quantity: number;
}

type ChosenAttributes = {
    [attributeSetId: string]: string;
}

export type { CartItem, ChosenAttributes };