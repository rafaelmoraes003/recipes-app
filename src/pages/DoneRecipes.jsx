import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const DoneRecipes = () => {
  /* const [mapRecipesFinish, getmapRecipesFinish] = useState(); */
  const [idRecipes, getIdRecipes] = useState();
  useEffect(() => {
    const getList = () => {
      const getProgressRecipes = JSON
        .parse(localStorage.getItem('inProgressRecipes' || '[]'));
      console.log(getProgressRecipes);
    };
    console.log(idRecipes, getIdRecipes);
    getList();
  }, []);

  /*

  useEffect(() => {
    const getList = () => {
      const getProgressRecipes = JSON
        .parse(localStorage.getItem('inProgressRecipes' || '[]'));
      const IDSRECEITAS = 'ids-receitas';
      const getListIdRecipes = JSON.parse(localStorage.getItem(IDSRECEITAS) || '[]');
      getListIdRecipes.push(Object.keys(getProgressRecipes.meals));
      console.log('----', Object.keys(getProgressRecipes));
      localStorage
        .setItem(IDSRECEITAS, JSON.stringify(getListIdRecipes));

      const getListIdRecipes2 = JSON.parse(localStorage.getItem(IDSRECEITAS) || '[]');
      console.log('getList', getListIdRecipes2);
      getIdRecipes(...getListIdRecipes2);
      console.log('ids', idRecipes);
    };
    getList();
  }, []);
*/
  /* https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}; */
  /*
  useEffect(() => {
    const fetchList = async () => {
      const number = 52878;
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${number}`);
      const data = await response.json();
      console.log(data);
    };
    if (idRecipes.length !== 0) {
      idRecipes.map((recipes) => console.log('recipes2', recipes));
    }

    console.log('Recipes', idRecipes);
    fetchList();
  }, [idRecipes]);
*/
  return (

    <div>
      hahaha

      <Header title="Done Recipes" showSearchIcon={ false } />
      {/*
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
      <p data-testid={ `${index}-horizontal-top-text` }>Categoria</p>
      <p data-testid={ `${index}-horizontal-top-name` }>Name</p>
      <p data-testid={ `${index}-horizontal-done-date` }>data</p>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        Compartilhar

      </button>
      <p data-testid={ `data-testid=${index}-${tagName}-horizontal-tag` }>...</p>
     */}
      ;
    </div>

  );
};
export default DoneRecipes;
