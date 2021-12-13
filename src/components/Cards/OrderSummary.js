import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const OrderSummary = () => {
  const {
    quantity,
    data,
    setTotal,
    setTaxes,
    setSubtotal,
    Total,
    Taxes,
    Subtotal,
  } = useContext(ShopifyData);

  setTotal(data.productByHandle.variants.edges[0].node.price * quantity);

  setTaxes((Total * 13.044) / 100);

  setSubtotal(Total - Taxes);

  return (
    <div className="card order-summary">
      <label>Order Summary</label>
      <div className="img-quantity-block">
        <img
          className="main-product-image"
          src={data.productByHandle.images.edges[2].node.transformedSrc}
          alt={data.productByHandle.images.edges[2].node.transformedSrc}
        />
        <span>{quantity}</span>
      </div>
      <div className="order-summary-grid">
        <div className="order-line bold">
          <span>
            {data.productByHandle.title &&
              data.productByHandle.title.replace('(SIM Included)', '')}
          </span>
          <span>({quantity})</span>
        </div>
        {Subtotal && (
          <div className="order-line">
            <span>Subtotal</span>
            <span>R{Subtotal.toFixed(2)}</span>
          </div>
        )}
        <div className="order-line">
          <span>Delivery</span>
          <span className="bold green">Free</span>
        </div>
        {/* <div className="order-line">
          <input type="text" placeholder="Discount Code" />
          <button onClick={ev => addDiscountCode(ev)}>Add</button>
        </div> */}
        {Taxes && (
          <div className="order-line">
            <span>Taxes</span>
            <span>R{Taxes.toFixed(2)}</span>
          </div>
        )}
        {Total && (
          <div className="order-line bold large no-border-btm">
            <span className="upperCase">Total</span>
            <span>R{Total.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
