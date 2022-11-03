import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';

export default function VerifyRecipeQuantity() {
  const { data, apiType } = useContext(MyContext);
  if (data?.length === 1) {
    if (apiType === 'meal') {
      return <Redirect to={ `${apiType}s/${data[0].idMeal}` } />;
    }
    if (apiType === 'drink') {
      return <Redirect to={ `${apiType}s/${data[0].idDrink}` } />;
    }
  }
}
