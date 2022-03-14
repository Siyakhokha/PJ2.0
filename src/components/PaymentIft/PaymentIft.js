import React, { useRef, useState } from 'react';
import './PaymentIft.scss';
import IKButton from '../../components/iKButton/IKButton';
const axios = require('axios');
import { AddToCartEvent } from '../../../src/utils/mparticleEvents';
import { showLoader } from '../../utils/ikLoader/js/ik-ui-loader';

const PaymentIft = ({
  pmtTotal,
  pmtformDataObject,
  pmtdraftOrderID,
  pmtImage,
  pmtProductName,
  pmtQuantity,
  pmtTaxes,
}) => {
  const choiceRef = useRef(null);
  const payType = useRef(null);
  const payRefUrl = useRef(null);
  const [paymentDisabled, setPaymentDisabled] = useState(true);

  const paymentBlockClicked = type => {
    payType.current = type;
    togglePaymentDisabled(false);
    switch (type) {
      case 'cc':
        choiceRef.current.querySelector('.cc').classList.add('selected');
        choiceRef.current.querySelector('.eft').classList.remove('selected');
        //payWithCC().then(resp => console.log(resp));
        break;
      case 'eft':
        choiceRef.current.querySelector('.eft').classList.add('selected');
        choiceRef.current.querySelector('.cc').classList.remove('selected');
        //payWithEFT().then(resp => console.log(resp));
        break;

      default:
        break;
    }
  };

  const payWithEFT = async () => {
    window.location.href = `${payRefUrl.current}/ift`;
  };

  const payWithCC = () => {
    window.location.href = `${payRefUrl.current}/card`;
  };

  const generatePaymentLink = () => {
    showLoader('Redirecting to the payment page.');

    let payLoad = {
      amount: pmtTotal,
      callbackUrl: `https://www.ikhokha.com/_hcms/api/ikshopcallback?draftorderid=${pmtdraftOrderID}`,
      successUrl: `https://www.ikhokha.com/pmt-res-success?draftorderid=${pmtdraftOrderID}`,
      failUrl: `https://www.ikhokha.com/pmt-res-fail?draftorderid=${pmtdraftOrderID}`,
      client: {
        platformName: 'ik_shop_direct_hubspot',
        platformVersion: '2.0.0',
        pluginVersion: '0.0.1',
        website: 'https://www.ikhokha.com',
      },
      customerName: `${pmtformDataObject.current.firstName.value} ${pmtformDataObject.current.lastName.value}`,
      customerPhone: pmtformDataObject.current.cellNumber.value,
      customerEmail: pmtdraftOrderID,
    };

    const headers = {
      'x-auth-token': '2ce549a3-5ac8-469f-b3de-378b92dc3030',
    };

    const getLink = async () => {
      const res = await axios({
        method: 'post',
        url: 'https://www.ikhokha.com/_hcms/api/createpaymentlinkstaging',
        data: payLoad,
        headers: headers,
      });
      payRefUrl.current = res.data.paymentUrl;
    };

    getLink().then(() => {
      AddToCartEvent(
        pmtformDataObject,
        pmtdraftOrderID,
        pmtImage,
        pmtProductName,
        pmtQuantity,
        pmtTotal,
        pmtTaxes,
      );
      switch (payType.current) {
        case 'cc':
          payWithCC();
          break;

        case 'eft':
          payWithEFT();
          break;

        default:
          break;
      }
    });
  };

  const togglePaymentDisabled = val => {
    setPaymentDisabled(val);
  };

  return (
    <div className="guest-checkout-ift-payment-choice">
      <h2>Choose your payment method: </h2>
      <p>All transactions are secured and encrypted.</p>
      <div
        className="guest-checkout-ift-payment-choice-container"
        ref={choiceRef}
      >
        <div
          className="guest-checkout-ift-payment-choice-container__block cc"
          onClick={() => paymentBlockClicked('cc')}
        >
          <svg
            id="Icon_Credit_Card_24x24"
            data-name="Icon Credit Card 24x24"
            xmlns="http://www.w3.org/2000/svg"
            width="28.207"
            height="28.207"
            viewBox="0 0 28.207 28.207"
          >
            <rect
              id="Shape"
              width="28.207"
              height="28.207"
              transform="translate(0 0)"
              opacity="0"
            />
            <g id="Pieces" transform="translate(3.524 5.874)">
              <path
                id="Path_46414"
                data-name="Path 46414"
                d="M2.643,4.5H18.5a2.646,2.646,0,0,1,2.643,2.643V17.717A2.646,2.646,0,0,1,18.5,20.36H2.643A2.646,2.646,0,0,1,0,17.717V7.143A2.646,2.646,0,0,1,2.643,4.5ZM18.5,18.6a.882.882,0,0,0,.881-.881V7.143a.882.882,0,0,0-.881-.881H2.643a.882.882,0,0,0-.881.881V17.717a.882.882,0,0,0,.881.881Z"
                transform="translate(0 -4.5)"
              />
              <path
                id="Path_46415"
                data-name="Path 46415"
                d="M20,16.933H1.5V13H20Z"
                transform="translate(-0.178 -8.573)"
              />
              <path
                id="Path_46417"
                data-name="Path 46417"
                d="M7.44,16.455H1.487a1.477,1.477,0,1,1,0-2.955H7.44a1.477,1.477,0,1,1,0,2.955Z"
                transform="translate(3.23 -3.841)"
              />
            </g>
          </svg>
          <div className="guest-checkout-ift-payment-choice-container__block__splurb">
            <h3>Credit or Debit Card</h3>
            <p>Use your Mastercard or Visa card to make a payment.</p>
          </div>
          <span className="guest-checkout-ift-payment-choice-container__block__radio">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14.256"
              height="11.798"
              viewBox="0 0 14.256 11.798"
            >
              <path
                id="tick"
                d="M305.085,328.981a1.475,1.475,0,0,0-2.025,2.144l4.424,4.178a1.475,1.475,0,0,0,2.177-.167l6.882-8.848a1.475,1.475,0,1,0-2.328-1.811l-5.885,7.567Z"
                transform="translate(-302.597 -323.908)"
              />
            </svg>
          </span>
        </div>
        <div
          className="guest-checkout-ift-payment-choice-container__block eft"
          onClick={() => paymentBlockClicked('eft')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27.495"
            height="16.667"
            viewBox="0 0 27.495 16.667"
          >
            <g id="Pieces" transform="translate(0.003 0.003)">
              <path
                id="Union_27"
                data-name="Union 27"
                d="M10.492,16.664a3,3,0,0,1-3-3v-.8A4.664,4.664,0,0,0,8.585,13h.142a4.717,4.717,0,0,0,.765-.062v.729a1,1,0,0,0,1,1h14a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1h-14a1,1,0,0,0-1,1v.729a4.786,4.786,0,0,0-.765-.062H8.585a4.675,4.675,0,0,0-1.093.129V3a3,3,0,0,1,3-3h14a3,3,0,0,1,3,3V13.664a3,3,0,0,1-3,3ZM1.038,12.154a.958.958,0,1,1,0-1.91H7.995a.958.958,0,1,1,0,1.91Zm20.88-1.279a.675.675,0,0,1-.176-.538V6.5H20.282a1.323,1.323,0,0,1-.107-.241,1.016,1.016,0,0,1-.05-.325.643.643,0,0,1,.139-.46.507.507,0,0,1,.382-.144H24.7a.9.9,0,0,1,.112.241,1.1,1.1,0,0,1,.046.325.647.647,0,0,1-.139.455.5.5,0,0,1-.382.148H23.208v4.45A2.075,2.075,0,0,1,22.92,11a3.171,3.171,0,0,1-.39.023A.957.957,0,0,1,21.918,10.875Zm-6.368,0a.688.688,0,0,1-.171-.538V6.1a.72.72,0,0,1,.77-.77h3.093a1.174,1.174,0,0,1,.1.241,1.1,1.1,0,0,1,.046.325.665.665,0,0,1-.134.455.484.484,0,0,1-.376.148H16.817V7.717h2.109a1.84,1.84,0,0,1,.107.242.936.936,0,0,1,.051.325.627.627,0,0,1-.14.45.492.492,0,0,1-.372.144H16.836v2.072a2.1,2.1,0,0,1-.288.051,3.186,3.186,0,0,1-.391.023A.941.941,0,0,1,15.549,10.875Zm-4.648.1a.72.72,0,0,1-.771-.771V6.1a.72.72,0,0,1,.771-.77h3.074a1.237,1.237,0,0,1,.1.232,1.006,1.006,0,0,1,.046.316.662.662,0,0,1-.134.455.481.481,0,0,1-.376.149H11.551v1.04h2.156a1.137,1.137,0,0,1,.1.232.978.978,0,0,1,.047.315.655.655,0,0,1-.13.451.473.473,0,0,1-.371.144h-1.8V9.825h2.462a1.116,1.116,0,0,1,.1.242,1.094,1.094,0,0,1,.046.325.622.622,0,0,1-.134.445.488.488,0,0,1-.367.14ZM3.36,9.289a.956.956,0,1,1,0-1.91H8.037a.956.956,0,1,1,0,1.91Zm1.826-2.87a1,1,0,0,1-1.042-.955,1,1,0,0,1,1.042-.955H7.992a1,1,0,0,1,1.042.955,1,1,0,0,1-1.042.955Z"
                transform="translate(0)"
              />
            </g>
          </svg>
          <div className="guest-checkout-ift-payment-choice-container__block__splurb">
            <h3>Instant EFT</h3>
            <p>
              Make a safe and quick EFT payment directly from your bank without
              using your card.
            </p>
          </div>
          <span className="guest-checkout-ift-payment-choice-container__block__radio">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14.256"
              height="11.798"
              viewBox="0 0 14.256 11.798"
            >
              <path
                id="tick"
                d="M305.085,328.981a1.475,1.475,0,0,0-2.025,2.144l4.424,4.178a1.475,1.475,0,0,0,2.177-.167l6.882-8.848a1.475,1.475,0,1,0-2.328-1.811l-5.885,7.567Z"
                transform="translate(-302.597 -323.908)"
              />
            </svg>
          </span>
        </div>
      </div>
      <IKButton
        disabled={paymentDisabled}
        onClick={() => generatePaymentLink()}
      />
    </div>
  );
};

export default PaymentIft;
