import { SAVE_INITIAL_FOODS, SAVE_INITIAL_DRINKS } from '../actions';

const INITIAL_STATE = {
  foods: [],
  drinks: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_INITIAL_FOODS:
    return {
      ...state,
      foods: action.payload,
    };
  case SAVE_INITIAL_DRINKS:
    return {
      ...state,
      drinks: action.payload,
    };
  default:
    return state;
  }
};

export default recipesReducer;
