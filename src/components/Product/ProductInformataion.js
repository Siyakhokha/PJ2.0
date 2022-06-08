import React, { useState, useEffect, useContext } from 'react';
import DeliveredInformation from './DeliveredInformation';
import ProductImage from './ProductImage';
import ProductReviews from './ProductReviews';
import ReviewForm from './ReviewForm';
import QuantityErrorAlert from './QuantityErrorAlert';
import GeneralInfo from './GeneralInfo';
import ProductSpecification from './ProductSpecification';
import ProductVideo from './ProductVideo';
import ProductReviewDetails from './ProductReviewDetails';
import ProductTitle from './ProductTitle';
import ProductDescription from './ProductDescription';
import ProductPrice from './ProductPrice';
import FreeDelivery from './FreeDelivery';
import MobileCheckout from './MobileCheckout';
import Checkout from './Checkout';
import { ShopifyData } from '../../Context/ShopifyData';

const ProductInformataion = ({
  draftOrderID,
  productImage,
  productName,
  quantity,
  Total,
  Taxes,
  InvoiceUrl,
}) => {
  const {
    ModuleDataObject,
    handleAccordionClick,
    setAccordionActive,
    accordionActive,
    QuantityError,
  } = useContext(ShopifyData);

  const [reviewToggle, setReviewToggle] = useState(true);
  const [Closebtn, setClosebtn] = useState(false);

  useEffect(() => {
    setAccordionActive(0);

    return () => {};
  }, []);

  return (
    <>
      <div className="ik-pdp-container">
        <div className="ik-pdp-top">
          <div className="ik-pdp-top__col1">
            <div className="ik-pdp-feature-image">
              <ProductImage />
            </div>
          </div>
          <div className="ik-pdp-top__col2">
            <ProductTitle />
            <div className="product-review-container">
              <ProductReviewDetails />
            </div>
            <ProductDescription />
            <ProductPrice />
            <FreeDelivery />

            <div>
              <div className="features-highlights-container__general_info">
                <GeneralInfo />

                <div className="features-highlights-container__general_info--payment-logos">
                  <img
                    src={ModuleDataObject.Payment_logos.src}
                    alt={ModuleDataObject.Payment_logos.alt}
                  />
                </div>
              </div>
            </div>

            <Checkout
            // draftOrderID={draftOrderID}
            // productImage={productImage}
            // productName={productName}
            // quantity={quantity}
            // Total={Total}
            // Taxes={Taxes}
            // InvoiceUrl={InvoiceUrl}
            />
          </div>
        </div>

        <div className="ik-pdp-btm">
          <div id="Product-accordion" className="product-accordion">
            <div
              className={`product-accordion__item ${accordionActive == 0 &&
                'active'}`}
            >
              <div
                className="product-accordion__item--header"
                onClick={() => handleAccordionClick(0)}
              >
                <label>Product Information</label>
                <div
                  className={`product-accordion__item--header-icon ${accordionActive ==
                    0 && 'active'}`}
                ></div>
              </div>
              <div className="product-accordion__item--con">
                <div className="product-accordion__item--text">
                  <div className="product-accordion__item--text-left">
                    <ProductSpecification />
                  </div>
                  <ProductVideo />
                </div>
              </div>
            </div>
            <div
              id="Reviews"
              className={`product-accordion__item ${accordionActive == 1 &&
                'active'}`}
            >
              <div
                className="product-accordion__item--header"
                onClick={() => handleAccordionClick(1)}
              >
                <label>Reviews</label>
                <div
                  className={`product-accordion__item--header-icon ${accordionActive ==
                    1 && 'active'}`}
                ></div>
              </div>
              <div className="product-accordion__item--reviews">
                {reviewToggle ? (
                  <>
                    <p
                      className="btn"
                      onClick={() => {
                        setReviewToggle(false);
                      }}
                    >
                      Write A Review
                    </p>
                    <ProductReviews />
                  </>
                ) : (
                  <>
                    {Closebtn && (
                      <div className="close">
                        <p
                          className="btn"
                          onClick={() => {
                            setReviewToggle(true);
                          }}
                        >
                          Close
                        </p>
                      </div>
                    )}
                    <ReviewForm setClosebtn={setClosebtn} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-highlights-container">
        <div className="features-highlights-container__feature">
          <DeliveredInformation />
        </div>
      </div>
      <MobileCheckout />
      <div>{QuantityError && <QuantityErrorAlert />}</div>
    </>
  );
};

export default ProductInformataion;
