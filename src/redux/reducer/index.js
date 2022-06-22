import { combineReducers } from 'redux';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({ userReducer, recipesReducer });

export default rootReducer;
