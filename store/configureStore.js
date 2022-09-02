import { combineReducers, configureStore } from '@reduxjs/toolkit';
import getDate from './sliceDate';

const reducer = combineReducers({ getDate });
const store = configureStore({ reducer });

export default store;
