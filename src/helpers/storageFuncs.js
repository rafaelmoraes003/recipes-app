export const drinksInLocalStorage = (id, update = []) => {
  const storageStarted = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (storageStarted) {
    const startedFoodStorage = {
      ...storageStarted,
      cocktails: {
        ...storageStarted.cocktails,
        [id]: storageStarted.cocktails[id] ? storageStarted.cocktails[id] : update,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedFoodStorage));
  } else {
    const startedDrinkStorage = {
      meals: {},
      cocktails: {
        [id]: update,
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

export const drinksToFavorite = (recipe, setFavorite) => {
  const recipesToFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'))
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
  const storagedRecipes = [...recipesToFavorite, {
    id: recipe.idDrink,
    type: 'drink',
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  }];
  localStorage.setItem('favoriteRecipes', JSON.stringify(storagedRecipes));
  setFavorite(true);
};

export const foodToFavorite = (recipe, setFavorite) => {
  const recipesToFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'))
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
  const storagedFood = [...recipesToFavorite, {
    id: recipe.idMeal,
    type: 'food',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  }];
  // setFoodsInStorage(foodsInStorage.concat(storagedFood));
  localStorage.setItem('favoriteRecipes', JSON.stringify(storagedFood));
  setFavorite(true);
};

export const addDrinkInLocalStorage = (update, id) => {
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

export const favoriteRecipes = (dependency, setState) => {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (storage) {
    const id = dependency.location.pathname.split('/')[2];
    setState(storage.some((food) => food.id === id));
  }
};

export const doneRecipeFoodFunc = (recipe, date) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  const newRecipes = [...doneRecipes, {
    id: recipe.idMeal,
    type: 'food',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
    doneDate: date,
    tags: [recipe.strTags],
  }];
  localStorage.setItem('doneRecipes', JSON.stringify(newRecipes));
};

export const doneRecipeDrinkFunc = (recipe, date) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  const newRecipes = [...doneRecipes, {
    id: recipe.idDrink,
    type: 'drink',
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
    doneDate: date,
    tags: [],
  }];
  localStorage.setItem('doneRecipes', JSON.stringify(newRecipes));
};

export const doneRecipes = (dependency, setState) => {
  const storage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (storage) {
    const id = dependency.location.pathname.split('/')[2];
    setState(storage.some((recipe) => recipe.id === id));
  }
};
