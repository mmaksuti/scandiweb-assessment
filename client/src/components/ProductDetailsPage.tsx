import '../styles/ProductDetailsPage.css'

import React, { createRef, RefObject } from 'react';
import { QueryResult } from '@apollo/client';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import { Product } from '../models/Product';
import GET_PRODUCT from '../graphql/GetProduct';
import withQueryAndParam from '../hocs/WithQueryAndParam';

import arrowUp from '../assets/arrow-up.svg';
import arrowDown from '../assets/arrow-down.svg';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';
import { AttributeSet } from '../models/AttributeSet';
import { Attribute } from '../models/Attribute';
import { Price } from '../models/Price';
import { cartContext } from '../App';
import { CartContext } from '../models/CartContext';

interface IProductDetailsPageProps extends QueryResult<any> {}

interface IProductDetailsPageState {
    isScrollAtTop: boolean;
    isScrollAtBottom: boolean;
    selectedImageIndex: number;
    hoveredImageIndex: number;
    selectedAttributes: {[attributeSetId: string]: string};
}

class ProductDetailsPage extends React.Component<IProductDetailsPageProps, IProductDetailsPageState> {
    private galleryRef: RefObject<HTMLDivElement>;
    private refIsSet: boolean = false;

    constructor(props: IProductDetailsPageProps) {
        super(props);

        this.galleryRef = createRef();
        this.state = {
            isScrollAtTop: true,
            isScrollAtBottom: false,
            selectedImageIndex: 0,
            hoveredImageIndex: -1,
            selectedAttributes: {}
        };
    }

    componentDidMount() {
        if (this.galleryRef.current) {
            this.refIsSet = true;
            this.checkScrollPosition();
        }
    }

    componentDidUpdate() {
        // The ref won't always be set on the first render, so we use componentDidUpdate
        if (!this.refIsSet && this.galleryRef.current) {
            this.refIsSet = true;
            this.checkScrollPosition();
        }
    }

    checkScrollPosition = () => {
        if (!this.galleryRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = this.galleryRef.current;
        
        this.setState({
            isScrollAtTop: scrollTop === 0,
            isScrollAtBottom: scrollTop + clientHeight >= scrollHeight
        });
    }

    handleScroll = (direction: 'up' | 'down') => {
        if (!this.galleryRef.current) return;

        const scrollContainer = this.galleryRef.current;
        const scrollAmount = 480;

        if (direction === 'up') {
            scrollContainer.scrollBy({
                top: -scrollAmount,
                behavior: 'smooth'
            });
        } else {
            scrollContainer.scrollBy({
                top: scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    scrollToSelectedImage = () => {
        if (!this.galleryRef.current) return;

        const imageElements = this.galleryRef.current.getElementsByClassName('product-gallery-preview');
        const selectedImage = imageElements[this.state.selectedImageIndex] as HTMLImageElement;

        if (selectedImage) {
            const containerTop = this.galleryRef.current.scrollTop;
            const containerBottom = containerTop + this.galleryRef.current.clientHeight;
            const imageTop = selectedImage.offsetTop;
            const imageBottom = imageTop + selectedImage.offsetHeight;

            if (imageTop < containerTop) {
                this.galleryRef.current.scrollTo({
                    top: imageTop - 2,
                    behavior: 'smooth'
                });
            } else if (imageBottom > containerBottom) {
                this.galleryRef.current.scrollTo({
                    top: imageBottom - this.galleryRef.current.clientHeight + 2,
                    behavior: 'smooth'
                });
            }
        }
    }

    previousImage = () => {
        const { selectedImageIndex } = this.state;
        const { gallery } = this.props.data.product;

        if (selectedImageIndex > 0 ) {
            this.setState({ selectedImageIndex: selectedImageIndex - 1 }, this.scrollToSelectedImage);
        }
        else {
            this.setState({ selectedImageIndex: gallery.length - 1 }, this.scrollToSelectedImage);
        }
    }

    nextImage = () => {
        const { selectedImageIndex } = this.state;
        const { gallery } = this.props.data.product;

        if (selectedImageIndex < gallery.length - 1) {
            this.setState({ selectedImageIndex: selectedImageIndex + 1 }, this.scrollToSelectedImage);
        }
        else {
            this.setState({ selectedImageIndex: 0 }, this.scrollToSelectedImage);
        }
    }

    purifyAndParseHTML(htmlString: string) {
        const cleanHTML = DOMPurify.sanitize(htmlString);
        return parse(cleanHTML);
    }

    getAttributes(attributeSet: AttributeSet) {
        if (attributeSet.type === 'text') {
            return (
                <div className="attribute-values-text">
                    {attributeSet.items.map((item: Attribute) => {
                        return (
                            <div key={item.id}
                                className={`text-attribute ${this.state.selectedAttributes[attributeSet.id] === item.id ? 'selected' : ''}`}
                                onClick={() =>
                                    this.setState({
                                        selectedAttributes: {
                                            ...this.state.selectedAttributes,
                                            [attributeSet.id]: item.id
                                        }
                                    })
                                }
                            >
                                {item.value}
                            </div>
                        );
                    })}
                </div>
            );
        } else if (attributeSet.type === 'swatch') {
            return (
                <div className="attribute-values-swatch">
                    {attributeSet.items.map((item: Attribute) => {
                        return (
                            <div key={item.id}
                                className={`swatch-attribute ${this.state.selectedAttributes[attributeSet.id] === item.id ? 'selected' : ''}`}
                                style={{
                                    backgroundColor: item.value, 
                                }}
                                onClick={() =>
                                    this.setState({
                                        selectedAttributes: {
                                            ...this.state.selectedAttributes,
                                            [attributeSet.id]: item.id
                                        }
                                    })
                                }
                            >
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    getAttributeSets(product: Product) {
        return product.attributes.map((attributeSet: AttributeSet) => {
            if (this.state.selectedAttributes[attributeSet.id] === undefined && attributeSet.items.length > 0) {
                this.state.selectedAttributes[attributeSet.id] = attributeSet.items[0].id;
            }

            return (
                <div key={attributeSet.id} className="product-attribute">
                    <div className="product-attribute-name">{attributeSet.name}:</div>
                    {
                        this.getAttributes(attributeSet)
                    }
                </div>
            );
        });
    }
    
    getProductDetails(context: CartContext | null, product: Product) {
        const { isScrollAtTop, isScrollAtBottom } = this.state;
        const chosenCurrency = context ? context.cart.currency.label : 'USD';
        const price = product.prices.find((price: Price) => price.currency.label === chosenCurrency);
        if (!price) {
            return <></>;
        }

        return (
            <div className="product-details">
                <div className="product-gallery-previews"
                    onMouseLeave={() => this.setState({ hoveredImageIndex: -1 })}
                >
                    <img 
                        src={arrowUp} 
                        className={`arrow-up ${isScrollAtTop ? 'disabled' : ''}`}
                        onClick={() => this.handleScroll('up')}
                    />
                    <div ref={this.galleryRef}
                        className="product-gallery-image-previews"
                        onScroll={this.checkScrollPosition}
                    >
                        {product.gallery.map((image: string) => {
                            return (
                                <img 
                                    key={image} 
                                    src={image} 
                                    alt={product.name} 
                                    className={`product-gallery-preview ${this.state.selectedImageIndex === product.gallery.indexOf(image) ? 'selected' : ''}`}
                                    onClick={() => 
                                        this.setState({
                                            selectedImageIndex: product.gallery.indexOf(image)
                                        })
                                    }
                                    onMouseEnter={() => this.setState({ hoveredImageIndex: product.gallery.indexOf(image) })}
                                />
                            );
                        })}
                    </div>
                    <img 
                        src={arrowDown} 
                        className={`arrow-down ${isScrollAtBottom ? 'disabled' : ''}`}
                        onClick={() => this.handleScroll('down')}
                    />
                </div>
                <div className="product-gallery-carousel">
                    <img 
                        src={arrowLeft} 
                        className={`arrow-left ${product.gallery.length <= 1 ? 'disabled' : ''}`}
                        onClick={() => this.previousImage()}
                    />
                    <img src={product.gallery[
                            this.state.hoveredImageIndex !== -1 ?
                            this.state.hoveredImageIndex :
                            this.state.selectedImageIndex
                        ]}
                        alt={product.name}
                        className="product-gallery-image"
                    />
                    <img 
                        src={arrowRight} 
                        className={`arrow-right ${product.gallery.length <= 1 ? 'disabled' : ''}`}
                        onClick={() => this.nextImage()}
                    />
                </div>
                <div className="product-details-info">
                    <div className="product-details-name">{product.name}</div>
                    <div className="product-attributes">
                        {
                            this.getAttributeSets(product)
                        }
                    </div>
                    <div className="product-price">
                        <div className="product-price-label">Price:</div>
                        <div className="product-price-amount">{price.currency.symbol}{price.amount}</div>
                    </div>
                    <button className={`add-to-cart-button ${!product.inStock ? 'disabled' : ''}`} onClick={
                        () => {
                            if (context) {
                                context.cart.addItem(product, this.state.selectedAttributes);
                                context.setCart(context.cart);
                            }
                        }
                    }>Add to Cart</button>
                    <div className="product-details-description">{this.purifyAndParseHTML(product.description)}</div>
                </div>
            </div>
        );
    }
    render() {
        const { loading, error, data } = this.props as QueryResult<any>;

        if (loading) {
            return <></>;
        } else if (error) {
            return <div>Error! {error.message}</div>;
        }

        const product: Product = data.product;
        return (
            <cartContext.Consumer>
                {
                    (context) => {
                        return this.getProductDetails(context, product);
                    }
                }
            </cartContext.Consumer>
        );
    }
}

export default withQueryAndParam(ProductDetailsPage, GET_PRODUCT);