let customFlags = { 'Facebook.EventSourceUrl': window.location.href };

export const AddToCartEvent = (
  formDataObject,
  draftOrderID,
  productImage,
  productName,
  quantity,
  Total,
  Taxes,
) => {
  let gaUserId = document.cookie
    .match(/_ga=(.+?);/)[1]
    .split('.')
    .slice(-2)
    .join('.');

  let identityRequest = {
    userIdentities: {
      email: formDataObject.current.email.value,
      other3: gaUserId,
    },
  };

  let identityCallback = function(result) {
    setUtmUserAttribute(result);

    let product1 = mParticle.eCommerce.createProduct(
      productName, // Name
      productName, // SKU
      parseInt(Total), // Price
      parseInt(quantity), // Quantity
      'Card Machines',
      'card-machines',
      'iKhokha',
      1,
      '0000',
      {
        sku: productName,
        image_url: productImage,
      },
    );

    // 2. Summarize the transactionFF
    let transactionAttributes = {
      Affiliation: 'Hubspot Website',
      Id: draftOrderID,
      Revenue: parseInt(Total),
      Tax: parseInt(Taxes),
      Shipping: 100,
      Step: 1,
    };
    let customAttributes = {
      cart_url: `https://www.ikhokha.com/abandoned-cart-product-display?${draftOrderID.replace(
        'gid://shopify/DraftOrder/',
        '',
      )}`,
      braze_abandoned_cart: 'true',
      event_source: 'Online',
      cart_total: parseInt(Total),
      currency_code: 'ZAR',
    };
    let customFlags = {
      'Facebook.EventSourceUrl': window.location.href,
      'Google.Category': 'ecommerce',
      'Google.Label': 'Purchase Journey 2',
      'Google.Value': parseInt(Total),
      'Google.Location': window.location.href,
      'Google.Hostname': window.location.hostname,
      'Google.Page': window.location.pathname,
      'Google.DocumentReferrer': document.referrer,
    }; // if not passing any custom flags, pass null
    mParticle.eCommerce.logProductAction(
      mParticle.ProductActionType.AddToCart,
      [product1],
      customAttributes,
      customFlags,
      transactionAttributes,
    );
  };
  mParticle.eCommerce.setCurrencyCode('ZAR');
  mParticle.Identity.identify(identityRequest, identityCallback);
};

export const CheckoutEvent = (
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
      productName,
      productName,
      parseInt(Total),
      parseInt(quantity),
      'Card Machines',
      'card-machines',
      'iKhokha',
      1,
      '0000',
      {
        sku: productName,
        image_url: productImage,
      },
    );

    let transactionAttributes = {
      Affiliation: 'Hubspot Website',
      Id: draftOrderID,
      Revenue: parseInt(Total),
      Tax: parseInt(Taxes),
      Shipping: 100,
      Step: 2,
    };
    let customAttributes = {
      cart_url: `https://www.ikhokha.com/abandoned-cart-product-display?${draftOrderID.replace(
        'gid://shopify/DraftOrder/',
        '',
      )}`,
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

    let customFlags = {
      'Facebook.EventSourceUrl': window.location.href,
      'Google.Category': 'ecommerce',
      'Google.Label': 'Purchase Journey 2',
      'Google.Value': parseInt(Total),
      'Google.Location': window.location.href,
      'Google.Hostname': window.location.hostname,
      'Google.Page': window.location.pathname,
      'Google.DocumentReferrer': document.referrer,
    };

    mParticle.eCommerce.logProductAction(
      mParticle.ProductActionType.Checkout,
      [product1],
      customAttributes,
      customFlags,
      transactionAttributes,
    );
  };
  mParticle.eCommerce.setCurrencyCode('ZAR');
  mParticle.Identity.identify(identityRequest, identityCallback);
};

export const PersonalNavigationEvent = () => {
  mParticle.logEvent(
    'Checkout Journey',
    mParticle.EventType.Navigation,
    {
      source_page: 'Personal',
    },
    {
      'Facebook.EventSourceUrl': window.location.href,
      'Google.Location': window.location.href,
      'Google.Hostname': window.location.hostname,
      'Google.Page': window.location.pathname,
      'Google.DocumentReferrer': document.referrer,
    },
    {},
    {},
  );
};
export const DeliveryNavigationEvent = () => {
  mParticle.logEvent(
    'Checkout Journey',
    mParticle.EventType.Navigation,
    {
      source_page: 'Delivery',
    },
    {
      'Facebook.EventSourceUrl': window.location.href,
      'Google.Location': window.location.href,
      'Google.Hostname': window.location.hostname,
      'Google.Page': window.location.pathname,
      'Google.DocumentReferrer': document.referrer,
    },
    {},
    {},
  );
};
export const PaymentNavigationEvent = () => {
  mParticle.logEvent(
    'Checkout Journey',
    mParticle.EventType.Navigation,
    {
      source_page: 'Payment',
    },
    {
      'Facebook.EventSourceUrl': window.location.href,
      'Google.Location': window.location.href,
      'Google.Hostname': window.location.hostname,
      'Google.Page': window.location.pathname,
      'Google.DocumentReferrer': document.referrer,
    },
    {},
    {},
  );
};

const setUtmUserAttribute = result => {
  let User = result.getUser();

  if (window.location.href.includes('utm_campaign')) {
    let url_string = window.location.href; //window.location.href
    console.log(url_string);
    let url = new URL(url_string);

    let utm_campaign = url.searchParams.get('utm_campaign');
    let utm_source = url.searchParams.get('utm_source');
    let utm_medium = url.searchParams.get('utm_medium');
    let hsa_acc = url.searchParams.get('hsa_acc');
    let hsa_cam = url.searchParams.get('hsa_cam');
    let hsa_grp = url.searchParams.get('hsa_grp');
    let hsa_ad = url.searchParams.get('hsa_ad');
    let hsa_src = url.searchParams.get('hsa_src');
    let hsa_net = url.searchParams.get('hsa_net');
    let hsa_ver = url.searchParams.get('hsa_ver');
    let fbclid = url.searchParams.get('fbclid');

    User.setUserAttribute('$utm_content', utm_campaign);
    User.setUserAttribute('$campaign_id', hsa_ad);
    User.setUserAttribute('$utm_medium', utm_medium);
    User.setUserAttribute('$utm_campaign', utm_campaign);
    User.setUserAttribute('$utm_source', utm_source);
  } else if (document.referrer.includes('utm_campaign')) {
    let url_string = document.referrer; //window.location.href
    let url = new URL(url_string);

    let utm_campaign = url.searchParams.get('utm_campaign');
    let utm_source = url.searchParams.get('utm_source');
    let utm_medium = url.searchParams.get('utm_medium');
    let hsa_acc = url.searchParams.get('hsa_acc');
    let hsa_cam = url.searchParams.get('hsa_cam');
    let hsa_grp = url.searchParams.get('hsa_grp');
    let hsa_ad = url.searchParams.get('hsa_ad');
    let hsa_src = url.searchParams.get('hsa_src');
    let hsa_net = url.searchParams.get('hsa_net');
    let hsa_ver = url.searchParams.get('hsa_ver');
    let fbclid = url.searchParams.get('fbclid');

    User.setUserAttribute('$utm_content', utm_campaign);
    User.setUserAttribute('$campaign_id', hsa_ad);
    User.setUserAttribute('$utm_medium', utm_medium);
    User.setUserAttribute('$utm_campaign', utm_campaign);
    User.setUserAttribute('$utm_source', utm_source);
  }
};
