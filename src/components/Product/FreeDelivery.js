import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const FreeDelivery = () => {
  const { ModuleDataObject } = useContext(ShopifyData);

  return (
    <>
      <div className="product-delivery-container">
        {ModuleDataObject.Free_delivery_icon && (
          <img
            src={ModuleDataObject.Free_delivery_icon.src}
            alt={ModuleDataObject.Free_delivery_icon.alt}
          />
        )}
        <p>
          {ModuleDataObject.Free_delivery_text &&
            ModuleDataObject.Free_delivery_text}
        </p>
      </div>
    </>
  );
};

export default FreeDelivery;
