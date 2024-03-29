import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import image from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
const [cart, setCart] = useState([]);

//picture giffy added in here so that we use this state
// const [orderPlaced, setOrderPlaced] = useState(false);
// let imageThankYou;
// if(orderPlaced){
//     imageThankYou = <img src={image}/>
// }


//remove item from cart
    const removeProduct = (productKey)=>{
        const newCart = cart.filter(pd=>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }


    //now we go to the shipment page

    const history = useHistory()

    const handleProceedCheckout = ()=>{
        history.push("/shipment")
        // setOrderPlaced(true)    show image after the 
    };

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[]);


    return (
        <div className="twin_container">
           <div className = 'product_container'>
                {
                    cart.map(pd=> <ReviewItem 
                    product={pd}
                    removeProduct = {removeProduct}
                    ></ReviewItem>)
                }
                {/* {
                    imageThankYou
                } */}
           </div>
           <div className = "cart_container">
                <Cart cart={cart}>
                    <button onClick = {handleProceedCheckout} className='main_button'>
                        Proceed Checkout
                    </button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;