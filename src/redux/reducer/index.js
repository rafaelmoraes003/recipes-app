import { combineReducers } from 'redux';
import userReducer from './userReducer';
import foodsReducer from './foodsReducer';

const rootReducer = combineReducers({ userReducer, foodsReducer });

export default rootReducer;
