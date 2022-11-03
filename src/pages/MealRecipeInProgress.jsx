import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import RecipeInProgress from '../components/RecipeInProgress';

export default function MealRecipeInProgress() {
  const { fetchAPIByID, singleData } = useContext(MyContext);

  const history = useHistory();
  const [id, setId] = useState(0);
  useEffect(() => {
    const { location: { pathname } } = history;
    const thisId = pathname.split('/')[2];
    setId(pathname.split('/')[2]);
    fetchAPIByID(thisId, 'meal');
  }, []);

  return (
    <div>
      {/* <RecipeInProgress apiType="Meal" id={ id } /> */}
      { singleData.length > 0 && <RecipeInProgress apiType="Meal" id={ id } /> }
      <Footer />
    </div>
  );
}
