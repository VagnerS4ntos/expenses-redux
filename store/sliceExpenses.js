import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const slice = createSlice({
  name: 'getExpenses',
  initialState: {
    loading: false,
    allData: [],
    dataOnScreen: [],
    error: null,
  },
  reducers: {
    fetchStarted(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.allData = action.payload;
      state.error = null;
    },
    fetchError(state, action) {
      state.loading = false;
      state.allData = [];
      state.error = action.payload;
    },
    getDataToRender(state, action) {
      state.dataOnScreen = action.payload;
    },
  },
});

export const { fetchStarted, fetchSuccess, fetchError, getDataToRender } =
  slice.actions;

export const fetchExpenses = () => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const data = await getDocs(collection(db, 'allExpenses'));
    const expenses = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    expenses.map((item) => (item.date = new Date(item.date.seconds * 1000)));
    return dispatch(fetchSuccess(expenses));
  } catch (error) {
    return dispatch(fetchError(error.message));
  }
};

export default slice.reducer;
