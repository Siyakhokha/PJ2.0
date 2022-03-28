import axios from 'axios';
import { showLoader } from './ikLoader/js/ik-ui-loader';
import { AddToCartEvent } from './mparticleEvents';

export const completeOrder = (
  formDataObject,
  quantity,
  Total,
  Taxes,
  draftOrderID,
  productImage,
  productName,
) => {
  const createOrderPaymentLink = async () => {
    showLoader('Redirecting to payment page.');

    6;
    try {
      let payLoad = {
        amount: Total,
        callbackUrl: `https://www.ikhokha.com/_hcms/api/ikShopCallback?draftorderid=${draftOrderID}`,
        successUrl: `https://www.ikhokha.com/pmt-res-success?${draftOrderID.replace(
          'gid://shopify/DraftOrder/',
          '',
        )}`,
        failUrl: window.location.href,
        client: {
          platformName: 'ik_shop_direct_hubspot',
          platformVersion: '1.0.0',
          pluginVersion: '0.0.1',
          website: 'https://www.ikhokha.com',
        },
        customerName: `${formDataObject.current.firstName.value} ${formDataObject.current.lastName.value}`,
        customerPhone: formDataObject.current.cellNumber.value,
        customerEmail: formDataObject.current.email.value,
        reference: draftOrderID,
        test: false,
      };

      let res2 = await axios({
        method: 'post',
        url: 'https://www.ikhokha.com/_hcms/api/createpaymentlink',
        data: payLoad,
      });

      let paymentUrl = res2.data.paymentUrl;

      AddToCartEvent(
        formDataObject,
        draftOrderID,
        productImage,
        productName,
        quantity,
        Total,
        Taxes,
      );
      location = paymentUrl;
    } catch (error) {
      console.log(error.message);
    }
  };

  createOrderPaymentLink();
};
