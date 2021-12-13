import React, { useEffect, useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';
import Loading from '../../helpers/Loading/Loading';
import './Styles/HubSpotPDForm.scss';
const ReviewForm = ({ setClosebtn }) => {
  const { ModuleDataObject, uploadReviews } = useContext(ShopifyData);

  let PDFormDataObject = {};

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    if (ModuleDataObject.Review_form.form_id) {
      script.addEventListener('load', () => {
        if (window.hbspt) {
          let form = window.hbspt.forms.create({
            region: 'na1',
            portalId: ModuleDataObject.PortalId,
            formId: ModuleDataObject.Review_form.form_id,
            locale: 'en',
            submitButtonClass: 'proceed-to-checkout-btn',
            translations: {
              en: {
                required: "Hey! That's required!",
                submitText: 'Submit',
              },
            },
            onFormSubmit: () => {
              storeFormData();
            },
            onFormSubmitted: () => {
              RewiewData();
            },
            target: '#ReviewForm',
          });
          if (form) {
            setTimeout(() => setClosebtn(true), 500);
          }
        }
      });
    }
  }, []);

  const storeFormData = () => {
    let pdForm = document.querySelector('#ReviewForm form');
    let pdFormData = new FormData(pdForm);
    for (var p of pdFormData) {
      PDFormDataObject[p[0]] = p[1];
    }
  };

  const RewiewData = () => {
    uploadReviews(
      PDFormDataObject.email,
      PDFormDataObject.firstname,
      PDFormDataObject.review,
      PDFormDataObject.review_score,
      PDFormDataObject.title,
    );
  };
  return (
    <>
      <div id="ReviewForm">
        <Loading />
      </div>
    </>
  );
};

export default ReviewForm;
