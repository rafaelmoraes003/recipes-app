import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DetailsFoods from './pages/DetailsFoods';
import DetailsDrinks from './pages/DetailsDrinks';
import ProgressDrinks from './pages/ProgressDrinks';
import ProgressFoods from './pages/ProgressFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import IngredientsExploreDrinks from './pages/IngredientsExploreDrinks';
import IngredientsExploreFood from './pages/IngredientsExploreFood';
import ExploreFoodsNational from './pages/ExploreFoodsNational';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/profile" component={ Profile } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/foods/:id" component={ DetailsFoods } />
      <Route path="/drinks/:id" component={ DetailsDrinks } />
      <Route path="/foods/:id/in-progress" component={ ProgressFoods } />
      <Route path="/drinks/:id/in-progress" component={ ProgressDrinks } />
      <Route path="/explore" component={ Explore } />
      <Route path="/explore/foods" component={ ExploreFoods } />
      <Route path="/explore/drinks" component={ ExploreDrinks } />
      <Route path="/explore/foods/ingredients" component={ IngredientsExploreFood } />
      <Route path="/explore/drinks/ingredients" component={ IngredientsExploreDrinks } />
      <Route path="/explore/foods/nationalities" component={ ExploreFoodsNational } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
