import { configureStore } from '@reduxjs/toolkit';
import counterCartSlice from './counterCartSlice';

const store = configureStore({ reducer: { counterCart: counterCartSlice } });

export default store;
