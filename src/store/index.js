import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import chatReducer from './chatSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    chat: chatReducer,
  },
});
