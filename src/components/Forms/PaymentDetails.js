import React from 'react';
import BillingAddressToggle from '../Cards/BillingAddressToggle';
import OrderReview from '../Cards/OrderReview';
import OrderSummary from '../Cards/OrderSummary';

const PaymentDetails = ({
  paymentDetailsRef,
  fieldDetailsValid,
  formDataObject,
  businessDetailsSpecified,
  canSetNextBtnActive,
  goToView,
  isDesktop,
}) => {
  return (
    <>
      <OrderReview goToView={goToView} formDataObject={formDataObject} />
      <BillingAddressToggle
        paymentDetailsRef={paymentDetailsRef}
        fieldDetailsValid={fieldDetailsValid}
        formDataObject={formDataObject}
        businessDetailsSpecified={businessDetailsSpecified}
        canSetNextBtnActive={canSetNextBtnActive}
      />
      {!isDesktop && (
        <OrderSummary goToView={goToView} formDataObject={formDataObject} />
      )}
    </>
  );
};

export default PaymentDetails;
