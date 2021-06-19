import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    //const total = cart.reduce((total,prd)=> total + prd.price,0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        
        
    }
    let shipping = 0;
    if (total>35) {
        shipping=0;
        
    }
    else if (total>15) {
        shipping= 4.99;
        
    }
    else if (total>0) {
        shipping= 12.99;
        
    }
    const tax = (total/10).toFixed(2);
    const grandtotal = (total + shipping +Number(tax)).toFixed(2);
    return (
        <div>
            <h4>Order summary</h4>
            <p><small>Items orderd: {cart.length}</small></p>
            <p><small>product price: {Number((total).toFixed(2))}</small></p>
            <p><small>shipping cost: {shipping}</small></p>
            <p><small>Tax + Vat: {tax}</small></p>
            <p><small>Total price: {grandtotal}</small></p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;