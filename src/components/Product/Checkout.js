import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const Checkout = () => {
  const {
    quantity,
    nextClick,
    mobiQuantity,
    adJustQuantity,
    setNextStep,
  } = useContext(ShopifyData);

  return (
    <>
      <div className="product-quantity">
        <div className="product-quantity-container">
          <div className="custom-select">
            <div class="tt-input-counter style-01">
              <span class="minus-btn" onClick={() => adJustQuantity(-1)}></span>
              <input
                type="number"
                max="15"
                min="0"
                value={quantity}
                name="quantity"
                onChange={e => mobiQuantity(e)}
              />
              <span class="plus-btn" onClick={() => adJustQuantity(1)}></span>
            </div>
          </div>
        </div>
        <div className="Checkout-container">
          <button
            className={`${
              quantity > 0 ? 'active' : 'buy-now-container__BuyBtn'
            }`}
            onClick={() => {
              nextClick();
            }}
          >
            <div className="buy-now-container__BuyBtn--text">
              Proceed to Checkout
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
