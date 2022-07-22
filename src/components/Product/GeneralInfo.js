import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const GeneralInfo = () => {
  const { ModuleDataObject } = useContext(ShopifyData);

  return (
    <>
      {ModuleDataObject.general_info &&
        ModuleDataObject.general_info.map(i => {
          return (
            <div className="item-feature">
              <div className="features-highlights-container__general_info--icon">
                <img
                  src={i?.general_info_image.src}
                  alt={i?.general_info_image.alt}
                />
              </div>
              <div className="features-highlights-container__general_info--text">
                {i?.general_info_text}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default GeneralInfo;
