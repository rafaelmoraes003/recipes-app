const removeRecipeFromLocalStorage = (history, setState) => {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const id = history.location.pathname.split('/')[2];
  if (storage) {
    const removedFood = storage.filter((food) => food.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedFood));
  }
  setState(false);
};

export default removeRecipeFromLocalStorage;
