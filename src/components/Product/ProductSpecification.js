import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const ProductSpecification = () => {
  const { ModuleDataObject } = useContext(ShopifyData);

  // let chunked = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9],
  // ];

  // for (let i = 0; i < ModuleDataObject.product_information.length; i++) {
  //   console.log(
  //     '1st',
  //     ModuleDataObject.product_information[i].product_information_heading,
  //   );

  //   for (
  //     let j = 0;
  //     j <
  //     ModuleDataObject.product_information[i].product_information_text.length;
  //     j++
  //   ) {
  //     console.log(
  //       '2nd',
  //       ModuleDataObject.product_information[i].product_information_text[j]
  //         .product_information_text_item,
  //     );
  //   }
  // }

  // ModuleDataObject.product_information.map(i => {
  //   return i.product_information_text.map(x => {
  //     return console.log('kekekek', x.product_information_text_item);
  //   });
  // });

  // const result = ModuleDataObject.product_information.map(arr =>
  //   arr.reduce((o, [key, value]) => ((o[key] = value), o), {}),
  // );

  // console.log('ddderer', result);

  return (
    <>
      {}
      {ModuleDataObject.product_information &&
        ModuleDataObject.product_information.map(i => {
          return (
            <div className="item-feature">
              <div>
                <h6>
                  {i.product_information_heading &&
                    i.product_information_heading}
                </h6>
              </div>
              <div className="item-feature-text">
                <ul>
                  {i.product_information_text &&
                    i.product_information_text.map(x => {
                      return (
                        <li>
                          {x.product_information_text_item &&
                            x.product_information_text_item}
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
