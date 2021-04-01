import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity} = props.product;

    return (
        <div className="review_Item">
            <h4 className="product_name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <br/>
            <button className="main_button">Remove</button>
        </div>
    );
};

export default ReviewItem;