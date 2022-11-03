import { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import VerifyRecipeQuantity from '../components/VerifyRecipeQuantity';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';

function Meals() {
  const { setApiType } = useContext(MyContext);

  useEffect(() => {
    setApiType('meal');
  }, [setApiType]);

  return (
    <div>
      <VerifyRecipeQuantity />
      <Header title="Meals" />
      <Recipes />
      <Footer />
    </div>
  );
}
export default Meals;
