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

export const SAVE_STARTERED_FOODS = 'SAVE_STARTERED_FOODS';

export const SAVE_STARTERED_DRINKS = 'SAVE_STARTERED_DRINKS';

export const saveStarteredFoods = (recipes) => ({
  type: SAVE_STARTERED_FOODS,
  payload: recipes,
});

export const saveStarteredDrinks = (recipes) => ({
  type: SAVE_STARTERED_DRINKS,
  payload: recipes,
});
