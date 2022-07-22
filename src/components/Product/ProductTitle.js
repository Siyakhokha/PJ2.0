import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const ProductTitle = () => {
  const { ModuleDataObject, data } = useContext(ShopifyData);

  const { Sim_text } = ModuleDataObject;

  return (
    <>
      <h2 className="buy-product-title">
        {data?.productByHandle?.title &&
          data?.productByHandle?.title.replace('(SIM Included)', '')}
      </h2>
      <p className="product-review-container__sim">{Sim_text && Sim_text}</p>
    </>
  );
};

export default ProductTitle;
