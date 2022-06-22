import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const { data } = useSelector((state) => state.apiReducer);
  const MAX_CARDS = 12;

  useEffect(() => {
    if (!Array.isArray(data) || data.meals) {
      setFoods(data.meals.filter((food, index) => index < MAX_CARDS));
    }
  }, [data]);

  return (
    <div>
      <Header title="Foods" showSearchIcon />
      {foods.length > 1 && (
        <div>
          {foods.map((food, index) => (
            <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{food.strMeal}</h3>
              <img
                data-testid={ `${index}-card-img` }
                src={ food.strMealThumb }
                alt={ food.strMeal }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Foods;
