import React, { useState } from 'react';

import Select from 'react-select';
import { customStyles } from '../SelectCustomStyles/SelectCustomStyles';
import warningtriangle from '../../images/warningtriangle.svg';

const DeliveryDetails = ({
  fieldDetailsValid,
  deliveryDetailsRef,
  showElipsis,
  ramData,
  setRamData,
  formDataObject,
}) => {
  const [selectedZone, setSelectedZone] = useState(null);
  const setSelectedRamZoneId = item => {
    deliveryDetailsRef.current.querySelector('input[name="city"]').value =
      item.suburb;

    deliveryDetailsRef.current.querySelector('input[name="suburb"]').value =
      item.area;

    deliveryDetailsRef.current.querySelector('input[name="postalcode"]').value =
      item.postalCode;

    setRamData(null);

    //console.log(item.ramZoneId);
  };

  const provinceSelect = input => {
    formDataObject.current['province'].value = input.value;
    formDataObject.current['province'].isValid = true;
  };

  return (
    <section
      className="form-container delivery-details-form"
      ref={deliveryDetailsRef}
    >
      <div className="input-item select-item country">
        <label for="country">Country</label>
        <input
          type="text"
          name="country"
          id="country"
          defaultValue={formDataObject.current.country.value}
          required
          readOnly
        />
      </div>

      <div className="input-item complexBuilding">
        <label for="complexBuilding">Complex / Building (Optional)</label>
        <input
          type="text"
          name="complexBuilding"
          id="complexBuilding"
          placeholder="Type in here"
          defaultValue={formDataObject.current.complexBuilding.value}
          onBlur={event => fieldDetailsValid(event)}
        />
        <div className="errorMsg">
          <img src={warningtriangle} alt="error" />
          <span>Please type in your Complex / Building</span>
        </div>
      </div>
      <div className="input-item streetAddress">
        <label for="streetAddress" className="required">
          Street Address
        </label>
        <input
          type="text"
          name="streetAddress"
          id="streetAddress"
          placeholder="Eg. 1 Nokwe Ave, Umhlanga"
          required
          onBlur={event => fieldDetailsValid(event)}
          defaultValue={formDataObject.current.streetAddress.value}
        />
        <div className="errorMsg">
          <img src={warningtriangle} alt="error" />
          <span>Please type in your Street Address*</span>
        </div>
      </div>
      <div className="input-item select-item province">
        <label for="province">Province</label>
        <Select
          options={[
            { value: 'Eastern Cape', label: 'Eastern Cape' },
            { value: 'Free State', label: 'Free State' },
            { value: 'Gauteng', label: 'Gauteng' },
            { value: 'KwaZulu-Natal', label: 'KwaZulu-Natal' },
            { value: 'Limpopo', label: 'Limpopo' },
            { value: 'Mpumalanga', label: 'Mpumalanga' },
            { value: 'Northern Cape', label: 'Northern Cape' },
            { value: 'North West', label: 'North West' },
            { value: 'Western Cape', label: 'Western Cape' },
          ]}
          styles={customStyles}
          onChange={value => provinceSelect(value)}
          defaultValue={formDataObject.current.province.value}
        />
      </div>
      <div className="input-item select-item city">
        <label for="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          required
          autoComplete="nope"
          defaultValue={formDataObject.current.city.value}
          onBlur={event => fieldDetailsValid(event)}
        />
        {showElipsis && (
          <div className="pulse-container">
            <div className="dot-pulse"></div>
          </div>
        )}
      </div>

      {ramData !== null && (
        <div className="suburbs-list-block">
          <span>Please select...</span>
          {ramData.map(item => (
            <div
              className="zone-item"
              onClick={() => setSelectedRamZoneId(item)}
            >
              {item.suburb}
            </div>
          ))}
        </div>
      )}

      <div className="input-item select-item suburb">
        <label for="suburb">Suburb</label>
        <input
          type="text"
          name="suburb"
          id="suburb"
          required
          autoComplete="nope"
          onBlur={event => fieldDetailsValid(event)}
          defaultValue={formDataObject.current.suburb.value}
        />
      </div>

      <div className="input-item postalcode">
        <label for="postalcode" className="required">
          Postal Code
        </label>
        <input
          type="text"
          name="postalcode"
          id="postalcode"
          placeholder="Eg. 4319"
          required
          onBlur={event => fieldDetailsValid(event)}
          defaultValue={formDataObject.current.postalcode.value}
        />
        <div className="errorMsg">
          <img src={warningtriangle} alt="error" />
          <span>Please type in your Postal Code*</span>
        </div>
      </div>
    </section>
  );
};

export default DeliveryDetails;
