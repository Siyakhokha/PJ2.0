import React from 'react';

import warningtriangle from '../../images/warningtriangle.svg';

const PersonalDetails = ({
  fieldDetailsValid,
  personalDetailsRef,
  formDataObject,
}) => {
  return (
    <section
      className="form-container personal-details-form"
      ref={personalDetailsRef}
    >
      <div className="input-item firstName">
        <label for="firstName" className="required">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Type in here"
          required
          onBlur={event => fieldDetailsValid(event)}
          defaultValue={formDataObject.current.firstName.value}
        />
        <div className="errorMsg">
          <img src={warningtriangle} alt="error" />
          <span>Please type in your first name</span>
        </div>
      </div>
      <div className="input-item lastName">
        <label for="lastName" className="required">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Type in here"
          required
          onBlur={event => fieldDetailsValid(event)}
          defaultValue={formDataObject.current.lastName.value}
        />
        <div className="errorMsg">
          <img src={warningtriangle} alt="error" />
          <span>Please type in your last name</span>
        </div>
      </div>
      <div className="input-item email">
        <label for="email" className="required">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Jimmy@gmail.com"
          required
          onBlur={event => fieldDetailsValid(event)}
          defaultValue={formDataObject.current.email.value}
        />
        <div className="errorMsg">
          <img src={warningtriangle} alt="error" />
          <span>Please type in a valid email</span>
        </div>
      </div>
      <div className="input-item confirmEmail">
        <label for="confirmEmail" className="required">
          Confirm Email Address
        </label>
        <input
          type="email"
          name="confirmEmail"
          id="confirmEmail"
          placeholder="Jimmy@gmail.com"
          required
          onKeyUpCapture={event => fieldDetailsValid(event)}
          defaultValue={formDataObject.current.confirmEmail.value}
        />
        <div className="errorMsg">
          <img src={warningtriangle} alt="error" />
          <span>The email addresses do not match</span>
        </div>
      </div>
      <div className="input-item cellNumber">
        <label for="cellNumber" className="required">
          Cell Number
        </label>
        <input
          type="tel"
          name="cellNumber"
          id="cellNumber"
          placeholder="Eg. 000-000-0000"
          required
          onKeyUpCapture={event => fieldDetailsValid(event)}
          defaultValue={formDataObject.current.cellNumber.value}
        />
        <div className="errorMsg">
          <img src={warningtriangle} alt="error" />
          <span>Please type in your cell number</span>
        </div>
      </div>
    </section>
  );
};

export default PersonalDetails;
