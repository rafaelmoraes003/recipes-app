import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ExploreFoodNationality = () => {
  const history = useHistory();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      setCountries(data);
    };
    fetchCountries();
  },
  [history]);

  const renderCountries = () => {
    const NUMBER_OF_COUNTRIES = 12;
    const newCountries = countries.meals.slice(0, NUMBER_OF_COUNTRIES);
    return newCountries.map((country) => (
      <option
        data-testid={ `[data-testid="${country.strArea}-option"]` }
        key={ country.strArea }
        value={ country.strArea }
      >
        {country.strArea}
      </option>
    ));
  };

  return (
    <section>
      <Header title="Explore Nationalities" showSearchIcon />
      <div>
        <select
          className="form-control"
          data-testid="explore-by-nationality-dropdown"
        >
          { countries.meals && renderCountries() }
        </select>
      </div>
      <Footer />
    </section>
  );
};
export default ExploreFoodNationality;
