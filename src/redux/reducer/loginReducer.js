const INITIAL_STATE = {
  email: '',
  password: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      login: action.payload,
    };
  default:
    return state;
  }
};

export default loginReducer;
