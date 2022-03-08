import React, { useEffect, useContext } from 'react';
import './App.scss';
import './components/Product/Styles/PDP.scss';
import { ShopifyData } from './Context/ShopifyData';
import CheckoutProcess from './components/CheckoutProcess';

function App() {
  const {
    getReviews,
    pageNumber,
    quantity,
    ProductID,
    quantityRef,
    variantRef,
  } = useContext(ShopifyData);

  useEffect(() => {
    quantityRef.current = quantity;
    variantRef.current = ProductID;
    getReviews();
  }, [quantity, ProductID, pageNumber]);

  return (
    <div className="ik-shop-checkout__container">
      <CheckoutProcess />
    </div>
  );
}

export default App;
