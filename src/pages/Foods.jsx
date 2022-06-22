import React, { useState } from 'react';
import Header from '../components/Header';

const Foods = () => {
  const [recipesFoods, setRecipesFoods] = useState();
  return (
    <div>
      <Header title="Foods" showSearchIcon />
    </div>
  );
};
export default Foods;
