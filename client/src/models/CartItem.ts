type CartItem = {
    productId: string;
    chosenAttributes: {[attributeSetId: string]: string};
    quantity: number;
}

export type { CartItem };