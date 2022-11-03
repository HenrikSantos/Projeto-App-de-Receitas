import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import VerifyRecipeQuantity from '../components/VerifyRecipeQuantity';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';

function Drinks() {
  const { setApiType } = useContext(MyContext);

  useEffect(() => {
    setApiType('drink');
  }, [setApiType]);

  return (
    <div>
      <VerifyRecipeQuantity />
      <Header title="Drinks" />
      <Recipes />
      <Footer />
    </div>
  );
}
export default Drinks;
