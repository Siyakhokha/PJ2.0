import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const ProductDescription = () => {
  const { ModuleDataObject } = useContext(ShopifyData);

  return (
    <>
      {ModuleDataObject?.product_description && (
        <p className="product-review-container__name">
          {ModuleDataObject?.product_description}
          <span>
            <a href="#Product-accordion">See more{'>'}</a>
          </span>
        </p>
      )}
    </>
  );
};

export default ProductDescription;
