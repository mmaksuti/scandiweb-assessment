import { AttributeSet } from './AttributeSet';
import { Price } from './Price';

type Product = {
    id: string;
    name: string;
    inStock: boolean;
    gallery: string[];
    description: string;
    category: string;
    attributes: AttributeSet[];
    prices: Price[];
    brand: string;
}

export type { Product };