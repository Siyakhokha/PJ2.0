import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';
import chevron from '../../images/chevron.svg';
import editPencil from '../../images/edit-pencil.svg';

import { Views } from '../../utils/Views';

const OrderReview = ({ goToView, formDataObject }) => {
  const { step } = useContext(ShopifyData);

  return (
    <>
      {(step == 1 || step == 2) && (
        <div className="card order-review margin-top-20">
          <label>Order Review</label>
          {/* <button className="card-acc-toggle expanded">
            <img src={chevron} alt="chevron" />
          </button> */}
          <div className="order-review-content">
            <section>
              <label>Personal Details</label>
              {(step == 1 || step == 2) && (
                <button
                  className="edit-actions"
                  onClick={() => goToView(Views.personal)}
                >
                  <img src={editPencil} />
                  <span>Edit</span>
                </button>
              )}
              <div className="detail-items-block">
                <span>{`${formDataObject.current.firstName.value} ${formDataObject.current.lastName.value}`}</span>
                <span>{`${formDataObject.current.email.value}`}</span>
                <span>{`${formDataObject.current.cellNumber.value}`}</span>
              </div>
            </section>
            <section>
              <label>Delivery Address</label>
              {step == 2 && (
                <button
                  className="edit-actions"
                  onClick={() => goToView(Views.delivery)}
                >
                  <img src={editPencil} />
                  <span>Edit</span>
                </button>
              )}
              <div className="detail-items-block">
                <span>{`${formDataObject.current.country.value}`}</span>
                <span>{`${formDataObject.current.complexBuilding.value}`}</span>
                <span>{`${formDataObject.current.streetAddress.value}`}</span>
                <span>{`${formDataObject.current.city.value}`}</span>
                <span>{`${formDataObject.current.province.value}`}</span>
                <span>{`${formDataObject.current.postalcode.value}`}</span>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderReview;
