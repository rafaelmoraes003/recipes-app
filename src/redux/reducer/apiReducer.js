import { FETCH_DATA } from '../actions/fetchDataACTION';

const INITIAL_STATE = {
  data: [],
};

const apiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_DATA: {
    return { data: action.payload };
  }
  default:
    return state;
  }
};

export default apiReducer;
