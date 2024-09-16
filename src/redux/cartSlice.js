import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateTotal: (state) => {
      state.totalAmount = state.items.reduce((total, item) => total + item.price, 0);
    },
  },
});

export const { addToCart, updateTotal } = cartSlice.actions;
export default cartSlice.reducer;
