import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;     
    }

    //const allQuantity = cart.reduce((sum, quantity)=> sum + quantity, 0)

    let productCount = 0;
    for (let i = 0; i < cart.length; i++) {
        const count = cart[i];
        productCount = productCount + count.quantity
    }
    let shipping = 0;
    if(total > 35){
        shipping = 0
    }
    else if(total > 15){
        shipping = 4.99
    }
    else if
     (total > 0 ){
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
            <h4>Items Ordered : {cart.length}</h4>
            <p>Quantity : {productCount}</p>
            <p>Product Price : {formatNumber(total)}</p>
            <p><small>Tax : {formatNumber(tax)}</small></p>
            <p><small>Shipping Cost : {formatNumber(shipping)}</small></p>
            <h3>Total Price : {formatNumber(grandTotal)}</h3>
            <br/>
           {
               props.children
           }
            
        </div>
    );
};

export default Cart;