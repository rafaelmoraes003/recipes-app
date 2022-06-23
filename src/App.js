import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodDetail from './pages/FoodDetail';
import DrinkDetail from './pages/DrinkDetail';
import ProgressDrinks from './pages/ProgressDrinks';
import ProgressFoods from './pages/ProgressFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreFoodNationality from './pages/ExploreFoodNationality';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ FoodDetail } />
      <Route exact path="/drinks/:id" component={ DrinkDetail } />
      <Route path="/foods/:id/in-progress" component={ ProgressFoods } />
      <Route path="/drinks/:id/in-progress" component={ ProgressDrinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route path="/explore/foods/ingredients" component={ ExploreFoodsIngredients } />
      <Route path="/explore/drinks/ingredients" component={ ExploreDrinksIngredients } />
      <Route path="/explore/foods/nationalities" component={ ExploreFoodNationality } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
