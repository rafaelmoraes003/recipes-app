const saveFoodInLocalStorage = (ref, db) => {
  if (ref === 'Meal') {
    const storagedFood = [{
      id: db.idMeal,
      type: 'food',
      nationality: db.strArea,
      category: db.strCategory,
      alcoholicOrNot: '',
      name: db.strMeal,
      image: db.strMealThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(storagedFood));
  } else {
    const storagedDrink = [{
      id: db.idDrink,
      type: 'drink',
      nationality: '',
      category: db.strCategory,
      alcoholicOrNot: db.strAlcoholic,
      name: db.strDrink,
      image: db.strDrinkThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(storagedDrink));
  }
};
export default saveFoodInLocalStorage;
