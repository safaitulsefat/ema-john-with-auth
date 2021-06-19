import React from 'react';

const Reviewitem = (props) => {
    const reviewitemStyle = {
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }
    const {name,quantity,key,price} = props.product;
    return (
        <div style={reviewitemStyle}>
            <h4 className='product-name'>{name}</h4>
            <p>quantity: {quantity}</p>
            <p>${price}</p>
            <br/>
            <button
             className="main-btn"
             onClick={()=>props.removeProduct(key)}
             >Remove</button>
        </div>
    );
};

export default Reviewitem;