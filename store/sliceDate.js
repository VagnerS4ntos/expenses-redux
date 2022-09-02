import { createSlice } from '@reduxjs/toolkit';
const year = new Date().getFullYear();
const month = new Date().getMonth();

const slice = createSlice({
  name: 'date',
  initialState: {
    year,
    month,
  },
  reducers: {
    getYear(state, action) {
      state.year = action.payload;
    },
    getMonth(state, action) {
      state.month = action.payload;
    },
  },
});

export const { getYear, getMonth } = slice.actions;

export default slice.reducer;
