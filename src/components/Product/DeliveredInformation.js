import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const DeliveredInformation = () => {
  const { ModuleDataObject } = useContext(ShopifyData);

  return (
    <>
      {ModuleDataObject.Delivered_information &&
        ModuleDataObject.Delivered_information.map(i => {
          return (
            <div className="item-feature">
              <div className="features-highlights-container__feature">
                <img src={i.icon.src} alt={i.icon.alt} />
              </div>
              <div className="features-highlights-container__feature--text">
                {i.text}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default DeliveredInformation;
