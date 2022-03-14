import axios from 'axios';

export const SubmitDataPersonal = async (DataPersonal, setNextStep) => {
  let data = {
    fields: [
      {
        objectTypeId: '0-1',
        name: 'email',
        value: DataPersonal.current.email.value,
      },
      {
        objectTypeId: '0-1',
        name: 'firstname',
        value: DataPersonal.current.firstName.value,
      },
      {
        objectTypeId: '0-1',
        name: 'lastname',
        value: DataPersonal.current.lastName.value,
      },

      {
        objectTypeId: '0-1',
        name: 'mobilephone',
        value: DataPersonal.current.cellNumber.value,
      },
    ],
    context: {
      //hutk: ':hutk',  include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
      pageUri: window.location.href,
      pageName: document.title,
    },
    legalConsentOptions: {
      // Include this object when GDPR options are enabledt
      consent: {
        consentToProcess: true,
        text:
          'I agree to allow Example Company to store and process my personal data.',
        communications: [
          {
            value: true,
            subscriptionTypeId: 999,
            text:
              'I agree to receive marketing communications from Example Company.',
          },
        ],
      },
    },
  };

  try {
    let res1 = await axios({
      method: 'post',
      url:
        'https://api.hsforms.com/submissions/v3/integration/submit/6412394/84efb5ce-4177-4a7f-abb0-9b8a53c2224e',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
    //alert(res1);
    if (res1.status === 200) {
      setNextStep(true);
    }
  } catch (error) {
    //alert(error);
    setNextStep(false);
  }
};

export const SubmitDeliveryDetails = async (DeliveryDetails, setNextStep) => {
  try {
    let data = JSON.stringify({
      submittedAt: Date.now(),
      fields: [
        {
          objectTypeId: '0-1',
          name: 'email',
          value: DeliveryDetails.current.email.value,
        },

        {
          objectTypeId: '0-1',
          name: 'complex___building',
          value: DeliveryDetails.current.complexBuilding.value,
        },
        {
          objectTypeId: '0-1',
          name: 'address',
          value: DeliveryDetails.current.streetAddress.value,
        },

        {
          objectTypeId: '0-1',
          name: 'delivery_suburb',
          value: DeliveryDetails.current.suburb.value,
        },
        {
          objectTypeId: '0-1',
          name: 'city',
          value: DeliveryDetails.current.city.value,
        },
        {
          objectTypeId: '0-1',
          name: 'country',
          value: 'South Africa',
        },
        {
          objectTypeId: '0-1',
          name: 'delivery_province',
          value: DeliveryDetails.current.province.value,
        },
        {
          objectTypeId: '0-1',
          name: 'delivery_postal_code',
          value: DeliveryDetails.current.postalcode.value,
        },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text:
            'I agree to allow Example Company to store and process my personal data.',
          communications: [
            {
              value: true,
              subscriptionTypeId: 999,
              text:
                'I agree to receive marketing communications from Example Company.',
            },
          ],
        },
      },
    });

    let config = {
      method: 'post',
      url:
        'https://api.hsforms.com/submissions/v3/integration/submit/6412394/06f38d41-e4f5-455c-b030-7cec51a62039',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const json = await axios(config);
    if (json.status === 200) {
      setNextStep(true);
    }
  } catch (error) {
    setNextStep(false);
  }
};
