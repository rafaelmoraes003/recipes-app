export const drinksInLocalStorage = (id) => {
  const storageStarted = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (storageStarted) {
    const startedFoodStorage = {
      ...storageStarted,
      cocktails: {
        ...storageStarted.cocktails,
        [id]: storageStarted.cocktails[id] ? storageStarted.cocktails[id] : [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedFoodStorage));
  } else {
    const startedDrinkStorage = {
      meals: {},
      cocktails: {
        [id]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedDrinkStorage));
  }
};

export const foodsInLocalStorage = (id) => {
  const storageStarted = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (storageStarted) {
    const startedFoodStorage = {
      ...storageStarted,
      meals: {
        ...storageStarted.meals,
        [id]: storageStarted.meals[id] ? storageStarted.meals[id] : [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedFoodStorage));
  } else {
    const startedFoodStorage = {
      cocktails: {},
      meals: {
        [id]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedFoodStorage));
  }
};

export const favoriteRecipe = (recipe, setFavorite) => {
  const storagedFood = [{
    id: recipe.idDrink,
    type: 'drink',
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  }];
  // setFoodsInStorage(foodsInStorage.concat(storagedFood));  // ------ NÃO APAGAR!!!!
  localStorage.setItem('favoriteRecipes', JSON.stringify(storagedFood));
  setFavorite(true);
};

export const addDrinkInLocalStorage = (update) => {
  const storageStarted = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const startedDrinktorage = {
    ...storageStarted,
    cocktails: {
      ...storageStarted.cocktails,
      [id]: update,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(startedDrinktorage));
};
