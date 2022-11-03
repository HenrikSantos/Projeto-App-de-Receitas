import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route /* BrowserRouter */ } from 'react-router-dom';
// import Provider from './context/Provider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealRecipe from './pages/MealRecipe';
import MealRecipeInProgress from './pages/MealRecipeInProgress';
import DrinkRecipe from './pages/DrinkRecipe';
import DrinkRecipeInProgress from './pages/DrinkRecipeInProgress';
import ProfilePage from './pages/ProfilePage';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => <Login { ...props } /> }
      />
      <Route
        exact
        path="/meals"
        render={ (props) => <Meals { ...props } /> }
      />
      <Route
        exact
        path="/meals/:id"
        render={ (props) => <MealRecipe { ...props } /> }
      />
      <Route
        exact
        path="/meals/:id/in-progress"
        render={ (props) => <MealRecipeInProgress { ...props } /> }
      />
      <Route
        exact
        path="/drinks"
        render={ (props) => <Drinks { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:id"
        render={ (props) => <DrinkRecipe { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        render={ (props) => <DrinkRecipeInProgress { ...props } /> }
      />
      <Route
        exact
        path="/profile"
        render={ (props) => <ProfilePage { ...props } /> }
      />
      <Route
        exact
        path="/done-recipes"
        render={ (props) => <DoneRecipes { ...props } /> }
      />
      <Route
        exact
        path="/favorite-recipes"
        render={ (props) => <FavoriteRecipes { ...props } /> }
      />
    </Switch>
  );
}

export default App;
