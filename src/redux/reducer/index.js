import { combineReducers } from 'redux';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({ userReducer, recipesReducer, apiReducer });

export default rootReducer;
