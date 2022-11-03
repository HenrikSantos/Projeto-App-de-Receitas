import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import RecipeDetails from '../components/RecipeDetails';

export default function MealRecipe() {
  const { fetchAPIByID, fetchRecomendation } = useContext(MyContext);

  const history = useHistory();
  const [id, setId] = useState(0);
  useEffect(() => {
    const { location: { pathname } } = history;
    const thisId = pathname.split('/')[2];
    setId(pathname.split('/')[2]);
    fetchAPIByID(thisId, 'meal');
    fetchRecomendation(thisId, 'drink');
  }, []);

  return (
    <div>
      <RecipeDetails apiType="Meal" id={ id } />
      <Footer />
    </div>
  );
}
