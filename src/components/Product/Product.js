import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img, name, seller, price, stock, key} = props.product;
    const handleAddProduct = props.handleAddProduct;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div className="product_details">
                <h4 className="product_name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br/>
                <p><small>By: {seller}</small></p>
                <br/>
                <p>${price}</p>
                <br/>
                <p><small>Only {stock} left in stock - Order soon</small></p>
               {props.showAddToCart && <button onClick={()=>handleAddProduct(props.product)} className="main_button"><FontAwesomeIcon icon={faShoppingCart} />Add To Cart</button>}
            </div>
        </div>
    );
};

export default Product;