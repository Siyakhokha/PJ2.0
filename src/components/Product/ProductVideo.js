import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const ProductVideo = () => {
  const { ModuleDataObject } = useContext(ShopifyData);

  return (
    <>
      {ModuleDataObject?.product_video?.embed_html && (
        <div className="product-accordion__item--text-right">
          <div
            className="product-accordion__item--text-right-video"
            dangerouslySetInnerHTML={{
              __html: ModuleDataObject?.product_video?.embed_html,
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default ProductVideo;
