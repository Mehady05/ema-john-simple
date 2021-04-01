import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const total = cart.reduce((previous, currentPrice, value )=>  previous + currentPrice.price, 0);

    let shipping = 0;
    if(total > 35){
        shipping = 0
    }
    else if(total > 15){
        shipping = 4.99
    }
    else if (total > 0 ){
        shipping = 12.99
    }

    const tax = total / 10
    const grandTotal = total + tax + shipping;

    const formatNumber = function(num){
        const precision = num.toFixed(2);
        return Number(precision)
    }
   

    return (
        <div>
            <h2>Order Summary</h2>
            <h4>Items Ordered : {props.cart.length}</h4>
            <p>Product Price : {formatNumber(total)}</p>
            <p><small>Tax : {formatNumber(tax)}</small></p>
            <p><small>Shipping Cost : {formatNumber(shipping)}</small></p>
            <h3>Total Price : {formatNumber(grandTotal)}</h3>
            <br/>
            <Link to="/review">
                <button className="main_button">Review Order</button>
            </Link>
            
        </div>
    );
};

export default Cart;