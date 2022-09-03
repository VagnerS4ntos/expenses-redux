import { combineReducers, configureStore } from '@reduxjs/toolkit';
import getDate from './sliceDate';
import fetchExpenses from './sliceExpenses';

const reducer = combineReducers({ getDate, fetchExpenses });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
