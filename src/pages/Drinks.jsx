import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
// import { useSelector } from 'react-redux';
// import Header from '../components/Header';

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const { data } = useSelector((state) => state.apiReducer);
  const MAX_CARDS = 12;

  useEffect(() => {
    if (!Array.isArray(data) || data.drinks) {
      setDrinks(data.drinks.filter((drink, index) => index < MAX_CARDS));
    }
  }, [data]);

  return (
    <div>
      <Header title="Drinks" showSearchIcon />
      {drinks.length > 1 && (
        <div>
          {drinks.map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Drinks;
