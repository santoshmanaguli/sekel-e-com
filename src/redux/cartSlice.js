import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cartItems');
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
    return [];
  }
};

const saveCartToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
};

const initialState = {
  items: loadCartFromLocalStorage(),
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      saveCartToLocalStorage(state.items)
    },
    updateTotal: (state) => {
      state.totalAmount = state.items.reduce((total, item) => total + item.price, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items); 
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      localStorage.removeItem('cartItems'); 
    }
  }
});

export const { addToCart, updateTotal, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
