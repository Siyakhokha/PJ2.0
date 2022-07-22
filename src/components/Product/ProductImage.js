import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const ProductImage = () => {
  const { data } = useContext(ShopifyData);
  return (
    <>
      {data?.productByHandle?.images?.edges[2]?.node?.transformedSrc && (
        <img
          className="main-product-image"
          src={data?.productByHandle?.images?.edges[2]?.node?.transformedSrc}
          alt={data?.productByHandle?.images?.edges[2]?.node?.transformedSrc}
        />
      )}
    </>
  );
};

export default ProductImage;
