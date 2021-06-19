import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import Reviewitem from '../reviewitem/Reviewitem';
import happyimg from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart,setCart]  = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory();
    const handleProcedCheckout = () => {
        history.push("/shipment");
        
        
    }
    useEffect(()=>{
            const savedCart = getDatabaseCart();
            
            const productkey = Object.keys(savedCart);
            
            const cartproduct = productkey.map(key=>{
                const product = fakeData.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            })

            setCart(cartproduct);
    }
    
    ,[])
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => 
            pd.key !== productKey
        );
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyimg} alt=""/>
    }

    return (
        <div className='twin-container'>
            <div className='product-container'>
               {
                   cart.map(pd=> <Reviewitem product={pd} key={pd.key} removeProduct={removeProduct}></Reviewitem>)
               } 
               {
                   thankyou
               }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handleProcedCheckout} className='main-btn'>proced checkout</button>
                </Cart>
            </div>
           
        </div>
    );
};

export default Review;