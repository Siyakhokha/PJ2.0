import React, { useState } from 'react';
import BusinessDetails from '../Forms/BusinessDetails';
import './BillingAddressToggle.scss';

const BillingAddressToggle = ({
  paymentDetailsRef,
  fieldDetailsValid,
  formDataObject,
  businessDetailsSpecified,
  canSetNextBtnActive,
}) => {
  const [separateAddress, setSeparateAddress] = useState(false);

  const addingBusinessDetails = val => {
    businessDetailsSpecified.current = val;
    setSeparateAddress(val);
    canSetNextBtnActive();
  };
  return (
    <>
      {/* the billing address toggle */}
      <div className="billing-address-block">
        <h3>Billing Address</h3>
        <p>Select the address that matches your card and payment method.</p>

        <div className="address-billing-toggle">
          <div
            className={`toggle-item ${!separateAddress && 'selected'}`}
            onClick={() => addingBusinessDetails(false)}
          >
            <span className="toggle-item__title">Same as Delivery Address</span>
            <span className="toggle-item__check-state-container">
              {!separateAddress && '✔'}
            </span>
          </div>
          <div
            className={`toggle-item ${separateAddress && 'selected'}`}
            onClick={() => addingBusinessDetails(true)}
          >
            <span className="toggle-item__title">
              Use a different Billing Address
            </span>
            <span className="toggle-item__check-state-container">
              {separateAddress && '✔'}
            </span>
          </div>
        </div>
      </div>

      {/* the billing address form */}
      {separateAddress && (
        <BusinessDetails
          paymentDetailsRef={paymentDetailsRef}
          fieldDetailsValid={fieldDetailsValid}
          formDataObject={formDataObject}
        />
      )}
    </>
  );
};

export default BillingAddressToggle;
