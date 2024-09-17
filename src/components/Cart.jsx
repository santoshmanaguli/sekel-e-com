import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTotal, removeItem, clearCart } from '../redux/cartSlice';  // Import the actions
import './Cart.css';  // Import the CSS file

const Cart = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTotal());
  }, [items, dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id)); 
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h1 className="text-center">Shopping Cart</h1>
      {items.length > 0 ? (
        <div>
          <ul className="list-group">
            {items.map((item) => (
              <li key={item.id} className="list-group-item cart-item">
                <div className="row">
                  <div className="col-md-8">
                    <h5>{item.title}</h5>
                    <p>Price: ${item.price}</p>
                  </div>
                  <div className="col-md-4">
                    <button 
                      onClick={() => handleRemoveItem(item.id)} 
                      className="btn btn-danger">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${totalAmount.toFixed(2)}</h3> 
            <button 
              onClick={handleClearCart} 
              className="btn btn-warning">
              Clear Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
