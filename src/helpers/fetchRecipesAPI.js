export const fetchFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const dataFoods = await response.json();
  return dataFoods.meals;
};

export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const dataDrinks = await response.json();
  return dataDrinks;
};
