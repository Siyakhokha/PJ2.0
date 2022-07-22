import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const ProductSpecification = () => {
  const { ModuleDataObject } = useContext(ShopifyData);

  return (
    <>
      {ModuleDataObject?.product_information &&
        ModuleDataObject?.product_information?.map(i => {
          return (
            <div className="item-feature">
              <div>
                <h6>
                  {i?.product_information_heading &&
                    i?.product_information_heading}
                </h6>
              </div>
              <div className="item-feature-text">
                <ul>
                  {i?.product_information_text &&
                    i?.product_information_text.map(x => {
                      return (
                        <li>
                          {x?.product_information_text_item &&
                            x?.product_information_text_item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductSpecification;
