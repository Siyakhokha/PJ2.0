import React, { useEffect, useRef, useState, useContext } from 'react';
import '../App.scss';
import PersonalDetails from './Forms/PersonalDetails';
import DeliveryDetails from './Forms/DeliveryDetails';
import PaymentDetails from './Forms/PaymentDetails';

import Stepper from './Stepper/Stepper';

import trolley from '../images/trolley.svg';

import { ValidateEmail } from '../utils/ValidateEmail';
import { ValidatePhone } from '../utils/ValidatePhone';
import OrderReview from './Cards/OrderReview';
import OrderSummary from './Cards/OrderSummary';
import { Views } from '../utils/Views';

import { completeOrder } from '../utils/completeOrder';
import { ShopifyData } from '../Context/ShopifyData';

const axios = require('axios');

const CheckoutProcess = () => {
  const {
    quantity,
    step,
    setStep,
    Total,
    prevClick,
    nextClick,
    ProductID,
    setStepToPersonalDetail,
    ModuleDataObject,
    data,
    Taxes,
  } = useContext(ShopifyData);

  //states
  // const [step, setStep] = useState(0);
  const [showElipsis, setShowElipsis] = useState(false);
  const [ramData, setRamData] = useState(null);
  const [isDesktop, setIsDeskTop] = useState(false);

  //refs
  const businessDetailsSpecified = useRef(false);
  const formDataObject = useRef({
    firstName: { value: '', isValid: false },
    lastName: { value: '', isValid: false },
    email: { value: '', isValid: false },
    confirmEmail: { value: '', isValid: false },
    cellNumber: { value: '', isValid: false },
    country: { value: 'South Africa', isValid: true },
    complexBuilding: { value: '', isValid: true },
    streetAddress: { value: '', isValid: false },
    province: { value: '', isValid: false },
    city: { value: '', isValid: false },
    suburb: { value: '', isValid: false },
    postalcode: { value: '', isValid: false },
    complexBuildingbiz: { value: '', isValid: true },
    streetAddressbiz: { value: '', isValid: false },
    provincebiz: { value: '', isValid: false },
    citybiz: { value: '', isValid: false },
    suburbbiz: { value: '', isValid: false },
    postalcodebiz: { value: '', isValid: false },
    countrybiz: { value: 'South Africa', isValid: true },
  });
  const personalDetails = useRef(null);
  const personalDetailsMembers = [
    'firstName',
    'lastName',
    'email',
    'confirmEmail',
    'cellNumber',
  ];
  const deliveryDetails = useRef(null);
  const deliveryDetailsMembers = [
    'country',
    'complexBuilding',
    'streetAddress',
    'city',
    'suburb',
    'postalcode',
  ];

  const paymentDetailsRef = useRef(null);
  const paymentDetailsMembers = [
    'countrybiz',
    'complexBuildingbiz',
    'streetAddressbiz',
    'citybiz',
    'suburbbiz',
    'postalcodebiz',
  ];

  // const addDiscountCode = ev => {
  //   let disCode = ev.target.parentElement.querySelector('input').value;
  //   //console.log(disCode);
  // };

  const fieldDetailsValid = event => {
    let fieldName = event.target.name;
    let fieldValue = event.target.value;

    //check to see there is a length
    if (fieldValue.length != 0) {
      formDataObject.current[fieldName].value = fieldValue;
      formDataObject.current[fieldName].isValid = true;
    } else {
      formDataObject.current[fieldName].value = fieldValue;
      formDataObject.current[fieldName].isValid = false;
    }

    //specific validity
    //Phone
    //1. Is it 10 digits long
    if (fieldName === 'cellNumber') {
      if (ValidatePhone(formDataObject.current[fieldName].value)) {
        formDataObject.current[fieldName].isValid = true;
        setFieldValid([fieldName]);
      } else {
        formDataObject.current[fieldName].isValid = false;
        setFieldInValid([fieldName]);
      }
    }

    //Email
    //2. is email input valid
    if (
      (fieldName === 'confirmEmail' || fieldName === 'email') &&
      (formDataObject.current.email.isValid ||
        formDataObject.current.confirmEmail.isValid)
    ) {
      if (ValidateEmail(formDataObject.current[fieldName].value)) {
        formDataObject.current[fieldName].isValid = true;
        setFieldValid([fieldName]);
      } else {
        formDataObject.current[fieldName].isValid = false;
        setFieldInValid([fieldName]);
      }
    }

    //3. do email addresses match?
    if (
      (fieldName === 'confirmEmail' || fieldName === 'email') &&
      (formDataObject.current.email.isValid ||
        formDataObject.current.confirmEmail.isValid)
    ) {
      if (
        formDataObject.current.confirmEmail.value ===
        formDataObject.current.email.value
      ) {
        setFieldValid(['email', 'confirmEmail']);
      } else {
        setFieldInValid(['email', 'confirmEmail']);
      }
    }

    //3. city autopopulate trigger event for suburb and postal code
    if (fieldName === 'city') {
      checkFieldLength('city');
      checkFieldLength('suburb');
      checkFieldLength('postalcode');
      checkFieldLength('country');
    }

    canSetNextBtnActive();
  };

  const checkFieldLength = fieldName => {
    let ele = deliveryDetails.current.querySelector(
      `input[name='${fieldName}']`,
    );

    //because there seems to be a delay in dom referencing
    setTimeout(() => {
      let fieldValue = ele.value;
      //console.log('fv ' + fieldValue);
      if (fieldValue.length != 0) {
        formDataObject.current[fieldName].value = fieldValue;
        formDataObject.current[fieldName].isValid = true;
      } else {
        formDataObject.current[fieldName].value = fieldValue;
        formDataObject.current[fieldName].isValid = false;
      }

      canSetNextBtnActive();
    }, 2000);
  };

  const setFieldValid = arr => {
    arr.forEach(field => {
      personalDetails.current
        .querySelector(`.${field}`)
        .classList.remove('inValid');
    });
  };

  const setFieldInValid = arr => {
    arr.forEach(field => {
      personalDetails.current
        .querySelector(`.${field}`)
        .classList.add('inValid');
    });
  };

  //Next Btn status 1
  //if there are no invalids open up the submit
  const canSetNextBtnActive = () => {
    if (step === 0) {
      personalDetailsMembers.every(input => {
        if (!formDataObject.current[input].isValid) {
          document.querySelector('.btn.step0').disabled = true;
          return false;
        }
        document.querySelector('.btn.step0').disabled = false;
        return true;
      });
    } else if (step === 1) {
      deliveryDetailsMembers.every(input => {
        if (!formDataObject.current[input].isValid) {
          document.querySelector('.btn.step1').disabled = true;
          return false;
        }
        document.querySelector('.btn.step1').disabled = false;
        return true;
      });
    } else if (step === 2 && businessDetailsSpecified.current) {
      paymentDetailsMembers.every(input => {
        if (!formDataObject.current[input].isValid) {
          document.querySelector('.btn.complete-order').disabled = true;
          return false;
        }
        document.querySelector('.btn.complete-order').disabled = false;
        return true;
      });
    } else if (step === 2 && !businessDetailsSpecified.current) {
      document.querySelector('.btn.complete-order').disabled = false;
    }
  };

  // const nextClick = () => {
  //   setStep(step + 1);
  // };

  const goToView = view => {
    if (step == 2 && view == 0) {
      setStepToPersonalDetail(true);
      setStep(view);
    } else {
      setStep(view);
      setStepToPersonalDetail(false);
    }
  };

  let stepTitles = ['Personal', 'Delivery', 'Payment'];

  /* to catch the city auto fetch suburbs list */
  useEffect(() => {
    if (deliveryDetails.current !== null && step === 1) {
      //ram zone id suburbs listing - the suburb auto popuplate trigger
      let searchTimer;

      deliveryDetails.current.querySelector(
        'input[name="city"]',
      ).onkeyup = function() {
        let searchTerm = deliveryDetails.current.querySelector(
          'input[name="city"]',
        ).value;

        searchTimer = setTimeout(() => getSurburbList(searchTerm), 1000);
      };

      deliveryDetails.current.querySelector(
        'input[name="city"]',
      ).onkeydown = function() {
        clearTimeout(searchTimer);
      };
    }

    canSetNextBtnActive();
  }, [step]);

  //to set the initial viewport size
  useEffect(() => {
    if (window.innerWidth > 767) {
      setIsDeskTop(true);
    } else if (window.innerWidth < 767) {
      setIsDeskTop(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsDeskTop(true);
      } else if (window.innerWidth < 767) {
        setIsDeskTop(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getSurburbList = searchTerm => {
    //go fetch the data using the search term and then set it as state
    //setRamData
    //
    //axios

    if (searchTerm !== '' && searchTerm.length > 3) {
      setShowElipsis(true);
      axios({
        url: `https://www.ikhokha.com/_hcms/api/fetchramzone`,
        method: 'post',
        data: {
          searchTerm: searchTerm,
        },
      })
        .then(function(response) {
          setShowElipsis(false);
          if (response.data.length > 0) {
            setRamData(response.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      setRamData(null);
    }
  };
  return (
    <div className="ik-shop-checkout__container">
      <Stepper step={step} />

      <div className="capture-view">
        <div className="first-block">
          <div className="step-info">
            <label className="step-value">{`STEP ${step + 1}`}</label>
            <label className="step-title">{stepTitles[step]}</label>
          </div>

          {step == 0 && (
            <PersonalDetails
              personalDetailsRef={personalDetails}
              fieldDetailsValid={fieldDetailsValid}
              formDataObject={formDataObject}
            />
          )}

          {step == 1 && (
            <DeliveryDetails
              deliveryDetailsRef={deliveryDetails}
              fieldDetailsValid={fieldDetailsValid}
              showElipsis={showElipsis}
              ramData={ramData}
              setRamData={setRamData}
              formDataObject={formDataObject}
            />
          )}

          {step == 2 && (
            <PaymentDetails
              paymentDetailsRef={paymentDetailsRef}
              fieldDetailsValid={fieldDetailsValid}
              formDataObject={formDataObject}
              businessDetailsSpecified={businessDetailsSpecified}
              canSetNextBtnActive={canSetNextBtnActive}
              goToView={goToView}
              isDesktop={isDesktop}
            />
          )}

          {step != Views.payment && (
            <div className="pinned-total-nav-block">
              <div className="top-row">
                <div className="top-row-left">
                  <img src={trolley} alt="trolley" />
                  <span className="top-row-left__title">Total</span>
                  <span className="top-row-left__quantity">
                    ({quantity}) items
                  </span>
                </div>
                {Total && (
                  <div className="top-row-right">
                    <span className="top-row-right__amt">
                      R{Total.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              <div className="btm-row">
                <button onClick={() => prevClick()} className="btn sec-btn">
                  Back
                </button>
                <button
                  onClick={() => nextClick()}
                  className={`btn prim-btn step${step} next`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === Views.payment && (
            <>
              <div className="payment-note">
                <h3>Payment Method</h3>
                <p>
                  All transactions are secure and encrypted. **Should you want
                  to do a manual EFT, please email{' '}
                  <a href="mailto: eft@ikhokha.com">eft@ikhokha.com.</a>
                </p>
              </div>
              <button
                className="btn prim-btn complete-order"
                onClick={() =>
                  completeOrder(
                    formDataObject,
                    quantity,
                    ProductID,
                    ModuleDataObject,
                    data,
                    Total,
                    Taxes,
                  )
                }
              >
                Complete Order
              </button>
            </>
          )}
        </div>
        {isDesktop && (
          <div className="second-block">
            <OrderSummary formDataObject={formDataObject} />
            <OrderReview goToView={goToView} formDataObject={formDataObject} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutProcess;
