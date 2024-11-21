import { createSlice } from '@reduxjs/toolkit';

const counterCartSlice = createSlice({
  name: 'counterCart',
  initialState: { value: 0, isLoading: false },
  reducers: {
    setCountCart: (state, action) => (state.value = action.payload),
    setStatusLoading: (state, action) => (state.isLoading = action.payload),
  },
});

export const { setCountCart, setStatusLoading } = counterCartSlice.actions;
export default counterCartSlice.reducer;
