export const fetchFoods = async (urlForFetch) => {
  const response = await fetch(urlForFetch);
  const dataFoods = await response.json();
  return dataFoods.meals;
};

export const fetchDrinks = async (urlForFetch) => {
  const response = await fetch(urlForFetch);
  const dataDrinks = await response.json();
  return dataDrinks.drinks;
};

export const fetchCategories = async (urlForFetch) => {
  const response = await fetch(urlForFetch);
  const categories = await response.json();
  return categories;
};

export const fetchSurpriseMe = async (urlForFetch) => {
  const response = await fetch(urlForFetch);
  const randomRecipe = await response.json();
  return randomRecipe;
};
