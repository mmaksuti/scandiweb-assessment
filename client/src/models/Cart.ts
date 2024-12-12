import { CartItem, ChosenAttributes } from './CartItem';
import { Currency } from './Currency';
import { Product } from './Product';

class Cart {
    items: CartItem[];
    currency: Currency;

    constructor(items: CartItem[], currency: Currency) {
        this.items = items;
        this.currency = currency;
    }

    getNumberOfItems() {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }

    calculateTotal() {
        return parseFloat(this.items.reduce((acc, item) => {
            const price = item.product.prices.find((price) => price.currency.label === this.currency.label);
            if (!price) {
                return acc;
            }

            return acc + (price.amount * item.quantity);
        }, 0).toFixed(2));
    }

    addItem(product: Product, chosenAttributes: ChosenAttributes = {}) {
        // if no attributes are chosen, choose the first attribute for each attribute set
        if (Object.keys(chosenAttributes).length === 0) {
            chosenAttributes = product.attributes.reduce((acc, attributeSet) => {
                acc[attributeSet.id] = attributeSet.items[0].id;
                return acc;
            }, {} as ChosenAttributes);
        }

        const item = {
            product: product,
            chosenAttributes: chosenAttributes,
            quantity: 1
        };

        for (const existingItem of this.items) {
            if (existingItem.product.id !== product.id) {
                continue;
            }

            let attributesMatch = true;
            for (const attributeSetId in chosenAttributes) {
                if (chosenAttributes[attributeSetId] !== existingItem.chosenAttributes[attributeSetId]) {
                    attributesMatch = false;
                    break;
                }
            }

            // Simply increment quantity in this case
            if (attributesMatch) {
                existingItem.quantity += 1;
                return;
            }
        }

        this.items.push(item);
    }   
}

export { Cart };