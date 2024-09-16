import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const { items, totalAmount } = useSelector(state => state.cart);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {items.length > 0 ? (
        <div>
          {items.map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>Price: {item.price}</p>
            </div>
          ))}
          <h2>Total: {totalAmount}</h2>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
