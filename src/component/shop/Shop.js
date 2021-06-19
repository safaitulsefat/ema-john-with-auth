import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products,setProduct] = useState(first10);
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        console.log(savedCart)
        const productKeys = Object.keys(savedCart);
        console.log(productKeys)
        const previousCart = productKeys.map( existkey => {
            const product = fakeData.find(pd => pd.key === existkey);
            product.quantity = savedCart[existkey];
            return product;
            
        })
        setCart(previousCart);
    },[])
    const handleAddProduct = (product)=>{
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const other = cart.filter(pd => pd.key !== product.key);
            newCart = [...other,sameProduct]
            
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        
        
        setCart(newCart)
        
        addToDatabaseCart(product.key,count)

    }
    return (
        <div className='twin-container'>
            
            <div className='product-container'>
            
                {
                  products.map(pd => <Product 
                    key={pd.key}
                    showAddToCart = {true}
                    handleAddProduct = {handleAddProduct}
                    product={pd}></Product>)
                }
            
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                <Link to='/review'>
                     <button className='main-btn'>review order</button>
               </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;