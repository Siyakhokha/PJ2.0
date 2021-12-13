import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const ProductPrice = () => {
  const { data, setPrice } = useContext(ShopifyData);

  setPrice(data.productByHandle.variants.edges[0].node.price);
  return (
    <>
      <div className="product-price-container">
        {data.productByHandle.variants.edges[0].node.price && (
          <span className="product-price-container__price">
            R
            {parseInt(
              data.productByHandle.variants.edges[0].node.price,
            ).toFixed(2)}
          </span>
        )}

        {data.productByHandle.variants.edges[0].node.compareAtPriceV2
          .amount && (
          <span className="product-price-container__compare">
            R
            {parseInt(
              data.productByHandle.variants.edges[0].node.compareAtPriceV2
                .amount,
            ).toFixed(2)}
          </span>
        )}
      </div>
    </>
  );
};

export default ProductPrice;
