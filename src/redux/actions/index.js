export const SAVE_USER = 'SAVE_USER';

export const saveUser = (user) => ({
  type: SAVE_USER,
  payload: user,
});

export const SAVE_INITIAL_FOODS = 'SAVE_INITIAL_FOODS';

export const saveInitialFoods = (recipes) => ({
  type: SAVE_INITIAL_FOODS,
  payload: recipes,
});

export const SAVE_INITIAL_DRINKS = 'SAVE_INITIAL_DRINKS';

export const saveInitialDrinks = (recipes) => ({
  type: SAVE_INITIAL_DRINKS,
  payload: recipes,
});
