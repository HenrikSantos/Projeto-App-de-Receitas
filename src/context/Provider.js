import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import MyContext from './MyContext';

const MAX_RECOMENDATION = 11;

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [apiType, setApiType] = useState('meal');
  const [nameFilter, setNameFilter] = useState('');
  const [filterType, setFilterType] = useState('name');

  const fetchSearchAPI = async () => {
    const internApiType = apiType;
    let URL = '';
    const apiName = (internApiType === 'meal') ? 'meal' : 'cocktail';
    if (filterType === 'ingredient') {
      URL = `https://www.the${apiName}db.com/api/json/v1/1/filter.php?i=${nameFilter}`;
    }
    if (filterType === 'name') {
      URL = `https://www.the${apiName}db.com/api/json/v1/1/search.php?s=${nameFilter}`;
    }
    if (filterType === 'firstLetter') {
      if (nameFilter.length > 1 || nameFilter === 0) {
        global.alert('Your search must have only 1 (one) character');
      }
      URL = `https://www.the${apiName}db.com/api/json/v1/1/search.php?f=${nameFilter}`;
    }
    try {
      const response = await fetch(URL);
      const apiData = await response.json();
      if (internApiType === 'meal') {
        if (apiData.meals === null) {
          throw new Error();
        }
        const filtredArr = apiData.meals
          .filter((el, index) => index <= MAX_RECOMENDATION);
        setData(filtredArr);
      }
      if (internApiType === 'drink') {
        if (apiData.drinks === null) {
          throw new Error();
        }
        const filtredArr = apiData.drinks
          .filter((el, index) => index <= MAX_RECOMENDATION);
        setData(filtredArr);
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const fetchCategories = async () => {
    const internApiType = apiType;
    const apiName = (internApiType === 'meal') ? 'meal' : 'cocktail';
    const URL = `https://www.the${apiName}db.com/api/json/v1/1/list.php?c=list`;
    try {
      const response = await fetch(URL);
      const apiCategoriesData = await response.json();
      if (internApiType === 'meal') {
        setCategories(apiCategoriesData.meals);
      }
      if (internApiType === 'drink') {
        setCategories(apiCategoriesData.drinks);
      }
    } catch (error) {
      global.alert('Error to fetch categories');
    }
  };

  const searchByCategory = async (name) => {
    const internApiType = apiType;
    try {
      const apiName = (internApiType === 'meal') ? 'meal' : 'cocktail';
      const URL = `https://www.the${apiName}db.com/api/json/v1/1/filter.php?c=${name}`;
      const response = await fetch(URL);
      const apiData = await response.json();
      if (internApiType === 'meal') {
        if (apiData.meals === null) {
          throw new Error();
        }
        const filtredArr = apiData.meals
          .filter((el, index) => index <= MAX_RECOMENDATION);
        setCategoriesData(filtredArr);
      }
      if (internApiType === 'drink') {
        if (apiData.drinks === null) {
          throw new Error();
        }
        const filtredArr = apiData.drinks
          .filter((el, index) => index <= MAX_RECOMENDATION);
        setCategoriesData(filtredArr);
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const fetchAPIByID = async (id, apiNewType) => {
    try {
      const apiName = (apiNewType === 'meal') ? 'meal' : 'cocktail';
      const URL = `https://www.the${apiName}db.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const apiData = await response.json();
      if (apiNewType === 'meal') {
        setSingleData(apiData.meals);
      }
      if (apiNewType === 'drink') {
        setSingleData(apiData.drinks);
      }
    } catch (error) {
      global.alert('erro');
    }
  };

  const fetchRecomendation = async (id, apiNewType) => {
    try {
      const MAX_RECOMENDATION_ELEMENTS = 5;
      const apiName = (apiNewType === 'meal') ? 'meal' : 'cocktail';
      const URL = `https://www.the${apiName}db.com/api/json/v1/1/search.php?s=`;
      const response = await fetch(URL);
      const apiData = await response.json();
      if (apiNewType === 'meal') {
        const filtredArr = apiData.meals
          .filter((el, index) => index <= MAX_RECOMENDATION_ELEMENTS);
        setRecomendation(filtredArr);
      }
      if (apiNewType === 'drink') {
        const filtredArr = apiData.drinks
          .filter((el, index) => index <= MAX_RECOMENDATION_ELEMENTS);
        setRecomendation(filtredArr);
      }
    } catch (error) {
      global.alert('erro');
    }
  };

  const all = () => {
    setNameFilter('');
    setFilterType('name');
    fetchSearchAPI();
    setCategoriesData([]);
  };

  useEffect(() => {
    fetchSearchAPI();
    fetchCategories();
  }, [apiType]);

  const contextValue = useMemo(() => ({
    fetchSearchAPI,
    fetchCategories,
    setData,
    data,
    categories,
    setApiType,
    apiType,
    setNameFilter,
    nameFilter,
    setFilterType,
    all,
    searchByCategory,
    fetchAPIByID,
    singleData,
    categoriesData,
    fetchRecomendation,
    recomendation,
  }), [data, categories, recomendation,
    apiType, nameFilter, singleData, categoriesData]);

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;
