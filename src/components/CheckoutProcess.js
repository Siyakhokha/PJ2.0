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
import { ValidateTextInput } from '../utils/ValidateTextInput';
import {
  AddToCartEvent,
  PaymentNavigationEvent,
} from '../utils/mparticleEvents';

import {
  SubmitDataPersonal,
  SubmitDeliveryDetails,
} from '../utils/SubmitFormData';
import Loading from '../helpers/Loading/Loading';
import ProductInformataion from './Product/ProductInformataion';
import StepCounter from './Stepper/StepCounter';
import PaymentIft from './PaymentIft/PaymentIft';
import { ProductIdDecoded } from '../utils/ProductIdDecoded';

const axios = require('axios');

const CheckoutProcess = () => {
  const {
    quantity,
    ProductID,
    setProductID,
    Taxes,
    Total,
    step,
    productImage,
    productName,
    setNextStep,
    NextStep,
    setStepToPersonalDetail,
    prevClick,
    nextClick,
    setStep,
    data,
    setProductTitle,
    setProductCode,
    ProductCode,
  } = useContext(ShopifyData);

  const [showElipsis, setShowElipsis] = useState(false);
  const [ramData, setRamData] = useState(null);
  const [isDesktop, setIsDeskTop] = useState(false);
  const [draftOrderID, setDraftOrderID] = useState(null);
  const [InvoiceUrl, setInvoiceUrl] = useState(null);

  const OnlyletterNumbersAndSpaceRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
  // const OnlyletterNumbersAndSpaceRegex = /^[ A-Za-z0-9_@./#&+,-]*$/;
  const OnlyletterAndSpaceRegex = /^[a-zA-Z\s]*$/;
  const OnlynumberRegex = '^[0-9]{4}$';

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
    ramZoneId: { value: '', isValid: false },
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

  const fieldDetailsValid = event => {
    let fieldName = event.target.name;
    let fieldValue = event.target.value;

    if (fieldValue.length != 0) {
      formDataObject.current[fieldName].value = fieldValue;
      formDataObject.current[fieldName].isValid = true;
    } else {
      formDataObject.current[fieldName].value = fieldValue;
      formDataObject.current[fieldName].isValid = false;
    }

    switch (fieldName) {
      case 'firstName':
        if (ValidateTextInput(formDataObject.current[fieldName].value)) {
          formDataObject.current[fieldName].isValid = true;
          setFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setFieldInValid([fieldName]);
        }

        break;
      case 'lastName':
        if (ValidateTextInput(formDataObject.current[fieldName].value)) {
          formDataObject.current[fieldName].isValid = true;
          setFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setFieldInValid([fieldName]);
        }
        break;
      case 'cellNumber':
        if (ValidatePhone(formDataObject.current[fieldName].value)) {
          formDataObject.current[fieldName].isValid = true;
          setFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setFieldInValid([fieldName]);
        }
        break;
      case 'email':
        if (ValidateEmail(formDataObject.current[fieldName].value)) {
          formDataObject.current[fieldName].isValid = true;
          setFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setFieldInValid([fieldName]);
        }
        break;
      case 'confirmEmail':
        if (
          ValidateEmail(formDataObject.current[fieldName].value) &&
          formDataObject.current.confirmEmail.value ===
            formDataObject.current.email.value
        ) {
          formDataObject.current[fieldName].isValid = true;
          setFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setFieldInValid([fieldName]);
        }
        break;
      case 'complexBuilding':
        if (
          formDataObject.current.complexBuilding.value.match(
            OnlyletterNumbersAndSpaceRegex,
          )
        ) {
          formDataObject.current[fieldName].isValid = true;
          setDeliveryFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setDeliveryFieldInValid([fieldName]);
        }
        break;
      case 'streetAddress':
        if (
          formDataObject.current.streetAddress.value.match(
            OnlyletterNumbersAndSpaceRegex,
          )
        ) {
          formDataObject.current[fieldName].isValid = true;
          setDeliveryFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setDeliveryFieldInValid([fieldName]);
        }
        break;
      case 'city':
        if (formDataObject.current.city.value.match(OnlyletterAndSpaceRegex)) {
          formDataObject.current[fieldName].isValid = true;
          setDeliveryFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setDeliveryFieldInValid([fieldName]);
        }
        break;
      case 'postalcode':
        if (formDataObject.current.postalcode.value.match(OnlynumberRegex)) {
          formDataObject.current[fieldName].isValid = true;
          setDeliveryFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setDeliveryFieldInValid([fieldName]);
        }
        break;
      case 'complexBuildingbiz':
        if (
          formDataObject.current.complexBuildingbiz.value.match(
            OnlyletterNumbersAndSpaceRegex,
          )
        ) {
          formDataObject.current[fieldName].isValid = true;
          setBusinessFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setBusinessFieldInValid([fieldName]);
        }
        break;
      case 'streetAddressbiz':
        if (
          formDataObject.current.streetAddressbiz.value.match(
            OnlyletterNumbersAndSpaceRegex,
          )
        ) {
          formDataObject.current[fieldName].isValid = true;
          setBusinessFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setBusinessFieldInValid([fieldName]);
        }
        break;
      case 'citybiz':
        if (
          formDataObject.current.citybiz.value.match(OnlyletterAndSpaceRegex)
        ) {
          formDataObject.current[fieldName].isValid = true;
          setBusinessFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setBusinessFieldInValid([fieldName]);
        }
        break;
      case 'postalcodebiz':
        if (formDataObject.current.postalcodebiz.value.match(OnlynumberRegex)) {
          formDataObject.current[fieldName].isValid = true;
          setBusinessFieldValid([fieldName]);
        } else {
          formDataObject.current[fieldName].isValid = false;
          setBusinessFieldInValid([fieldName]);
        }
        break;
    }

    if (fieldName === 'city') {
      checkFieldLength('suburb');
      checkFieldLength('city');
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
      formDataObject.current[field].isValid = true;
    });
  };
  const setFieldInValid = arr => {
    arr.forEach(field => {
      personalDetails.current
        .querySelector(`.${field}`)
        .classList.add('inValid');
      formDataObject.current[field].isValid = false;
    });
  };
  const setBusinessFieldValid = arr => {
    arr.forEach(field => {
      paymentDetailsRef.current
        .querySelector(`.${field}`)
        .classList.remove('inValid');
      formDataObject.current[field].isValid = true;
    });
  };
  const setBusinessFieldInValid = arr => {
    arr.forEach(field => {
      paymentDetailsRef.current
        .querySelector(`.${field}`)
        .classList.add('inValid');
      formDataObject.current[field].isValid = false;
    });
  };
  const setDeliveryFieldValid = arr => {
    arr.forEach(field => {
      deliveryDetails.current
        .querySelector(`.${field}`)
        .classList.remove('inValid');
      formDataObject.current[field].isValid = true;
    });
  };
  const setDeliveryFieldInValid = arr => {
    arr.forEach(field => {
      deliveryDetails.current
        .querySelector(`.${field}`)
        .classList.add('inValid');
      formDataObject.current[field].isValid = false;
    });
  };

  setProductID(data.productByHandle.variants.edges[0].node.id);

  setProductTitle(data.productByHandle.title);
  setProductCode(data.productByHandle.id);

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
          //document.querySelector('.btn.complete-order').disabled = true;
          return false;
        }
        //document.querySelector('.btn.complete-order').disabled = false;
        return true;
      });
    } else if (step === 2 && !businessDetailsSpecified.current) {
      //document.querySelector('.btn.complete-order').disabled = false;
    }
  };

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
    window.scrollTo(0, 0);
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

  const createOrder = async () => {
    let lineItems = [
      {
        variantId: ProductID,
        quantity: parseInt(quantity),
      },
    ];
    //
    let orderDetails = {
      input: {
        customAttributes: { key: 'ikShopDirectOrder', value: 'true' },
        email: formDataObject.current.email.value,
        tags: ['IKHOKHA_HUBSPOT'],
        note: '',
        lineItems: lineItems,
        shippingAddress: {
          address1: formDataObject.current.streetAddress.value,
          address2: formDataObject.current.complexBuilding.value,
          city: formDataObject.current.city.value,
          country: formDataObject.current.country.value,
          firstName: formDataObject.current.firstName.value,
          lastName: formDataObject.current.lastName.value,
          phone: formDataObject.current.cellNumber.value,
          province: formDataObject.current.province.value,
          provinceCode: formDataObject.current.postalcode.value,
        },
      },
    };

    if (formDataObject.current.citybiz.value !== '') {
      orderDetails.input.billingAddress = {
        address1: formDataObject.current.streetAddressbiz.value,
        address2: formDataObject.current.complexBuildingbiz.value,
        city: formDataObject.current.citybiz.value,
        country: formDataObject.current.countrybiz.value,
        province: formDataObject.current.provincebiz.value,
        provinceCode: formDataObject.current.postalcodebiz.value,
      };
    }

    try {
      let res1 = await axios({
        method: 'post',
        url: 'https://www.ikhokha.com/_hcms/api/getdraftorderid',
        data: orderDetails,
      });

      const json = await res1.data;

      if (json.data.draftOrderCreate.draftOrder.id) {
        setInvoiceUrl(json.data.draftOrderCreate.draftOrder.invoiceUrl);
        SubmitDeliveryDetails(
          formDataObject,
          setNextStep,
          json.data.draftOrderCreate.draftOrder.id,
        );
        setDraftOrderID(json.data.draftOrderCreate.draftOrder.id);
        PaymentNavigationEvent();

        let newProductCode = ProductIdDecoded(ProductCode);

        AddToCartEvent(
          formDataObject,
          json.data.draftOrderCreate.draftOrder.id,
          productImage,
          productName,
          quantity,
          Total,
          Taxes,
          newProductCode,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {step == -1 && (
        <div id="one" className="container">
          <ProductInformataion
            draftOrderID={draftOrderID}
            productImage={productImage}
            productName={productName}
            quantity={quantity}
            Total={Total}
            Taxes={Taxes}
            InvoiceUrl={InvoiceUrl}
          />
        </div>
      )}
      {NextStep == false && (step == 0 || step == 1 || step == 2) && (
        <div id="one" className="container">
          <Loading />
        </div>
      )}

      <div className="ik-shop-checkout__container container">
        {step != Views.display && NextStep == true && <Stepper step={step} />}

        <div className="capture-view">
          <div className="first-block">
            {step != Views.display && NextStep == true && (
              <StepCounter step={step} stepTitles={stepTitles} />
            )}

            {step == 0 && NextStep == true && (
              <PersonalDetails
                personalDetailsRef={personalDetails}
                fieldDetailsValid={fieldDetailsValid}
                formDataObject={formDataObject}
              />
            )}

            {step == 1 && NextStep == true && (
              <DeliveryDetails
                deliveryDetailsRef={deliveryDetails}
                fieldDetailsValid={fieldDetailsValid}
                showElipsis={showElipsis}
                ramData={ramData}
                setRamData={setRamData}
                formDataObject={formDataObject}
                canSetNextBtnActive={canSetNextBtnActive}
                getSurburbList={getSurburbList}
              />
            )}

            {step == 2 && NextStep == true && (
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
            <>
              {step != Views.payment && step != Views.display && (
                <div className={NextStep ? 'pinned-total-nav-block' : 'hide'}>
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
                      onClick={() => {
                        nextClick();
                        step == 0
                          ? SubmitDataPersonal(formDataObject, setNextStep)
                          : createOrder();
                      }}
                      className={`btn prim-btn step${step} next`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>

            {step === Views.payment && (
              <>
                <div className={NextStep ? '' : 'hide'}>
                  <PaymentIft
                    pmtTotal={Total}
                    pmtformDataObject={formDataObject}
                    pmtdraftOrderID={draftOrderID}
                    pmtTaxes={Taxes}
                    pmtImage={productImage}
                    pmtProductName={productName}
                    pmtQuantity={quantity}
                    newProductCode={ProductIdDecoded(ProductCode)}
                  />
                </div>
              </>
            )}
          </div>
          {isDesktop && step != Views.display && NextStep == true && (
            <div className="second-block">
              <OrderSummary formDataObject={formDataObject} />
              {step == 1 && (
                <OrderReview
                  goToView={goToView}
                  formDataObject={formDataObject}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutProcess;
