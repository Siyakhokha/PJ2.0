const axios = require('axios');

export function submitDetails(
  customer,
  product,
  quantity,
  storeDraftOrderId,
  setBuyNowStep,
  storeCustomer,
) {
  //console.log(product);

  let orderDetails = {
    input: {
      customAttributes: { key: 'directOrder', value: 'true' },
      email: customer.querySelector('.email').value,
      tags: ['IKHOKHA_HUBSPOT'],
      lineItems: {
        quantity: quantity,
        title: product.productByHandle.title,
        variantId: product.productByHandle.variants.edges[0].node.id,
      },
      shippingAddress: {
        address1: customer.querySelector('.address').value,
        city: customer.querySelector('.city').value,
        country: customer.querySelector('.country').value,
        firstName: customer.querySelector('.firstName').value,
        lastName: customer.querySelector('.lastName').value,
        phone: customer.querySelector('.phone').value,
        province: customer.querySelector('.province').value,
        provinceCode: customer.querySelector('.postalCode').value,
      },
    },
  };

  //console.log(orderDetails);

  const getDraftOrderId = async () => {
    const res = await axios({
      method: 'post',
      url: 'https://www.ikhokha.com/_hcms/api/getdraftorderid',
      data: orderDetails,
    });

    const json = await res.data;

    storeDraftOrderId(json.data.draftOrderCreate.draftOrder.id);
    storeCustomer({
      customerName: `${customer.querySelector('.firstName').value} ${
        customer.querySelector('.lastName').value
      }`,
      customerPhone: customer.querySelector('.phone').value,
      customerEmail: customer.querySelector('.email').value,
    });
    setBuyNowStep(2);
  };

  getDraftOrderId();
}
