export const AddToCartEvent = (
  formDataObject,
  draftOrderID,
  productImage,
  productName,
  quantity,
  Total,
  Taxes,
) => {
  let identityRequest = {
    userIdentities: {
      email: formDataObject.current.email.value,
    },
  };

  let identityCallback = function() {
    let product1 = mParticle.eCommerce.createProduct(
      productName, // Name
      '123', // SKU
      parseInt(Total), // Price
      parseInt(quantity), // Quantity
      'Card Machines',
      'card-machines',
      'iKhokha',
      1,
      '0000',
      {
        image_url: productImage,
      },
    );

    // 2. Summarize the transactionFF
    let transactionAttributes = {
      Id: draftOrderID,
      Revenue: parseInt(Total),
      Tax: parseInt(Taxes),
      Shipping: 100,
      Step: 1,
    };
    let customAttributes = {
      cart_url: `https://www.ikhokha.com/abandoned-cart-product-display?${draftOrderID}`,
      event_source: 'Online',
      cart_total: parseInt(Total),
      currency_code: 'ZAR',
    };
    let customFlags = {};

    mParticle.eCommerce.logProductAction(
      mParticle.ProductActionType.AddToCart,
      [product1],
      customAttributes,
      customFlags,
      transactionAttributes,
    );
  };

  mParticle.Identity.identify(identityRequest, identityCallback);
};

export const CheckoutEvent = (id, formDataObject) => {
  let identityRequest = {
    userIdentities: {
      email: formDataObject.current.email.value,
    },
  };
  let identityCallback = function() {
    let product1 = mParticle.eCommerce.createProduct(
      productName,
      '123',
      parseInt(Total),
      parseInt(quantity),
      'Card Machines',
      'card-machines',
      'iKhokha',
      1,
      '0000',
    );

    let transactionAttributes = {
      Id: draftOrderID,
      Revenue: parseInt(Total),
      Tax: parseInt(Taxes),
      Shipping: 100,
      Step: 2,
    };
    let customAttributes = {
      cart_url: `https://www.ikhokha.com/abandoned-cart-product-display?${draftOrderID}`,
      event_source: 'Online',
      company_name: formDataObject.current.firstName.value,
      sub_total: parseInt(Total - Taxes),
      cart_total: parseInt(Total),
      currency_code: 'ZAR',
      discount_code: '000',
      discount_amount: 0,
      billing_address_changed: false,
      billing_address: formDataObject.current.streetAddress.value,
      billing_zip: formDataObject.current.postalcode.value,
      billing_city: formDataObject.current.city.value,
      billing_state: formDataObject.current.province.value
        .replace('-', '')
        .replace(' ', ''),
      billing_country: formDataObject.current.country.value,
      delivery_address: formDataObject.current.streetAddress.value,
      delivery_zip: formDataObject.current.postalcode.value,
      delivery_city: formDataObject.current.city.value,
      delivery_state: formDataObject.current.province.value
        .replace('-', '')
        .replace(' ', ''),
      delivery_country: formDataObject.current.country.value,
    };

    let customFlags = {};

    mParticle.eCommerce.logProductAction(
      mParticle.ProductActionType.Checkout,
      [product1],
      customAttributes,
      customFlags,
      transactionAttributes,
    );
  };
  mParticle.Identity.identify(identityRequest, identityCallback);
};
