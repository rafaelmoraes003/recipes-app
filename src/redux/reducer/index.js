import { combineReducers } from 'redux';
import userReducer from './userReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({ userReducer, apiReducer });

export default rootReducer;
