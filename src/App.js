import React, { useEffect, useContext } from 'react';
import './App.scss';
import './components/Product/Styles/PDP.scss';
import ProductDisplayPage from './components/Product/ProductDisplayPage';
import { ShopifyData } from './Context/ShopifyData';

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

  // useEffect(() => {
  //   var identityRequest = {
  //     userIdentities: {
  //       email: 'Siyandasokhela@gmail.com',
  //       customerid: '123456',
  //     },
  //   };
  //   var identityCallback = function(result) {
  //     if (result.getUser()) {
  //       console.log(result);
  //     }
  //   };
  //   // eslint-disable-next-line no-undef
  //   mParticle.Identity.identify(identityRequest, identityCallback);

  //   // eslint-disable-next-line no-undef
  //   mParticle.logEvent('Get Call Back Opened', mParticle.EventType.Other, {
  //     source: 'Web',
  //     cta: 'CallBackRequest',
  //   });
  //   // 1. Create the product
  //   // eslint-disable-next-line no-undef
  //   var product1 = mParticle.eCommerce.createProduct(
  //     'iKhokha Mover Pro', // Name
  //     'econ-1', // SKU
  //     100.0, // Price
  //     1, // Quantity
  //     'kl878kmkmk',
  //     'card-machines',
  //     'ikhokha',
  //     2,
  //     'NoCouponcode',
  //     'kkkko8447478',
  //     { sku: 'TetsSku' },
  //   );

  //   // 3. Log the purchase event (optional custom attributes an custom flags depending on your );
  //   var customAttributes = {
  //     event_source: 'Online',
  //     cart_total: 100.0,
  //     currency_code: 'ZAR',
  //   }; // if not passing any custom attributes, pass null
  //   // eslint-disable-next-line no-undef
  //   mParticle.eCommerce.logProductAction(
  //     // eslint-disable-next-line no-undef
  //     mParticle.ProductActionType.AddToCart,
  //     [product1],
  //     customAttributes,
  //   );
  //   console.log('hello you');
  // }, []);

  return (
    <div className="ik-shop-checkout__container">
      <ProductDisplayPage />
    </div>
  );
}

export default App;
