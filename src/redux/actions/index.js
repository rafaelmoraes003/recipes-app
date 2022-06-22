const SAVE_USER = 'SAVE_USER';

const saveUser = (user) => ({
  type: SAVE_USER,
  payload: user,
});

const SAVE_INITIAL_FOODS = 'SAVE_INITIAL_FOODS';

const saveInitialFoods = (recipes) => ({
  type: SAVE_INITIAL_FOODS,
  payload: recipes,
});

export {
  SAVE_USER,
  saveUser,
  SAVE_INITIAL_FOODS,
  saveInitialFoods,
};
