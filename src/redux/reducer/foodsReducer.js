import { SAVE_INITIAL_FOODS } from '../actions';

const INITIAL_STATE = {
  foods: [],
};

const foodsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_INITIAL_FOODS:
    return {
      ...state,
      foods: action.payload,
    };
  default:
    return state;
  }
};

export default foodsReducer;
