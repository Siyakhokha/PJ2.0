import React, { useContext, useEffect } from 'react';
import ProductInformataion from './ProductInformataion';
import { ShopifyData } from '../../Context/ShopifyData';
import CheckoutProcess from '../CheckoutProcess';
// import Loading from '../helpers/Loading/Loading';

const ProductDisplayPage = () => {
  const {
    setProductTitle,
    setProductID,
    data,
    ReadyForShipping,
    step,
  } = useContext(ShopifyData);
  setProductID(data.productByHandle.variants.edges[0].node.id);
  setProductTitle(data.productByHandle.title);

  useEffect(() => {}, []);
  return (
    <>
      {step == -1 && (
        <>
          <div id="one" className="container">
            <ProductInformataion />
          </div>
        </>
      )}
      {(step == 0 || step == 1 || step == 2) && (
        <div id="two" className="fade-in container">
          <CheckoutProcess />
        </div>
      )}
      <></>
    </>
  );
};
export default ProductDisplayPage;
