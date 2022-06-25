const filterOfIngredients = (recipe) => {
  const ingredients = recipe
    .filter((item) => JSON.stringify(item).includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
  const measures = recipe
    .filter((item) => JSON.stringify(item).includes('strMeasure'))
    .filter((measure) => measure[1] !== ' ' && measure[1] !== null);
  const ingredientsAndMeasures = ingredients
    .map((ingredient, index) => {
      if (measures[index]) {
        return `${ingredient[1]} - ${measures[index][1]}`;
      } return `${ingredient[1]}`;
    });
  return ingredientsAndMeasures;
};

export default filterOfIngredients;
