import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeData from "../../fakeData";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([])

  //review same to cart so use this from the database
  useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
  },[])

  const handleAddProduct = (product) =>{
    // const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd=>pd.key === product.key);
    let count = 1;
    let newCart;
    if(sameProduct){
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd=>pd.key !== product.key);
      newCart = [...others, sameProduct];
    }
    // 1st time add to the cart with quantity.............
    else{
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count)
  }
  return (
    <div class="twin_container">
      <div className="product_container">
        {products.map((pd) => (
          <Product 
          key={pd.key}
          handleAddProduct={handleAddProduct} 
          product={pd}
          showAddToCart={true}
          ></Product>
        ))}
      </div>
      <div className="cart_container">
        <Cart cart={cart}>
            <Link to="/review">
                <button className="main_button">Review Order</button>
            </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
