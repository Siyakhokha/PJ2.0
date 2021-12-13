import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const MobileCheckout = () => {
  const { quantity, nextClick, mobiQuantity } = useContext(ShopifyData);
  return (
    <>
      <div className="buy-now-container">
        <input
          type="number"
          max="15"
          min="0"
          value={quantity}
          onChange={e => mobiQuantity(e)}
        />
        <button
          className={`buy-now-container__BuyBtn ${
            quantity > 0 ? 'active' : ''
          }`}
          onClick={() => nextClick()}
        >
          <div className="buy-now-container__BuyBtn--text">Checkout</div>
        </button>
      </div>
    </>
  );
};

export default MobileCheckout;
