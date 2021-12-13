var axios = require('axios');
import { showLoader, changeLoaderText } from './ikLoader/js/ik-ui-loader';

export const completeOrder = (
  formDataObject,
  quantity,
  ProductID,
  ModuleDataObject,
  data,
  Total,
  Taxes,
) => {
  /* create a draftorder */

  //test product data //

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
      lineItems: lineItems,
      shippingAddress: {
        address1: formDataObject.current.streetAddress.value,
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

  console.log(orderDetails);

  const AddToCart_mp = id => {
    let identityRequest = {
      userIdentities: {
        email: formDataObject.current.email.value,
        //customerid: "123",
        mobile_number: '+27782521743',
      },
    };
    let identityCallback = function(result) {
      // 1. Create the product
      // eslint-disable-next-line no-undef
      let product1 = mParticle.eCommerce.createProduct(
        data.productByHandle.title, // Name
        '123', // SKU
        parseInt(Total), // Price
        parseInt(quantity), // Quantity
        'Card Machines',
        'card-machines',
        'iKhokha',
        parseInt(quantity),
        '0000',
        '0000',
        '0000',
      );
      // 2. Summarize the transactionFF
      let transactionAttributes = {
        Id: id,
        Revenue: parseInt(Total),
        Tax: parseInt(Taxes),
        Shipping: 100,
        Step: 2,
      };
      // 3. Log the purchase event (optional custom attributes an custom flags depending on your );
      let customAttributes = {
        event_source: 'Online',
        cart_total: parseInt(Total),
        currency_code: 'ZAR',
      }; // if not passing any custom attributes, pass null

      let customFlags = {}; // if not passing any custom flags, pass null

      // eslint-disable-next-line no-undef
      mParticle.eCommerce.logProductAction(
        // eslint-disable-next-line no-undef
        mParticle.ProductActionType.AddToCart,
        [product1],
        customAttributes,
        customFlags,
        transactionAttributes,
      );
    };
    // eslint-disable-next-line no-undef
    mParticle.Identity.identify(identityRequest, identityCallback);
  };

  const createOrderPaymentLink = async () => {
    showLoader('Creating your order');

    try {
      //shopify draftorder creation
      let res1 = await axios({
        method: 'post',
        url: 'https://www.ikhokha.com/_hcms/api/getdraftorderid',
        data: orderDetails,
      });

      const json = await res1.data;
      let draftOrderID = json.data.draftOrderCreate.draftOrder.id;
      let totalPrice = json.data.draftOrderCreate.draftOrder.totalPrice;

      changeLoaderText('Fetching your payment link');

      AddToCart_mp(draftOrderID);
      // console.log(draftOrderID);
      // console.log(totalPrice);

      //use the draftorder return to create a paylink
      let payLoad = {
        amount: totalPrice,
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
        test: true,
      };

      console.log(payLoad);

      let res2 = await axios({
        method: 'post',
        url: 'https://www.ikhokha.com/_hcms/api/createpaymentlink',
        data: payLoad,
      });

      let paymentUrl = res2.data.paymentUrl;

      /* update in hubspot */

      let data = JSON.stringify({
        email: formDataObject.current.email.value,
        properties: [
          {
            property: 'firstname',
            value: formDataObject.current.firstName.value,
          },
          {
            property: 'lastname',
            value: formDataObject.current.lastName.value,
          },
          {
            property: 'country',
            value: formDataObject.current.country.value,
          },
          {
            property: 'phone',
            value: formDataObject.current.cellNumber.value,
          },
          {
            property: 'address',
            value: formDataObject.current.streetAddress.value,
          },
          {
            property: 'delivery_province',
            value: formDataObject.current.province.value,
          },
          {
            property: 'delivery_postal_code',
            value: formDataObject.current.postalcode.value,
          },
        ],
      });

      await axios({
        method: 'post',
        url: 'https://www.ikhokha.com/_hcms/api/ikcompleteorder',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      location = paymentUrl;
    } catch (error) {
      console.log(error.message);
    }
  };

  createOrderPaymentLink();
};
