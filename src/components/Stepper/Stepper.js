import React, { useEffect, useRef, useContext } from 'react';
import './Stepper.scss';

import { ShopifyData } from '../../Context/ShopifyData';

const Stepper = ({ step }) => {
  const {
    stepToPersonalDetails,
    setStepToPersonalDetail,
    bar,
    stepperContainer,
    prevSetRef,
    usePrevious,
  } = useContext(ShopifyData);

  let prevStep = usePrevious(step);

  // useEffect(() => {
  //   prevSetRef.current = step;

  //   if (step > prevStep && !stepToPersonalDetails) {
  //     bar.current.classList.add(`bar${parseInt(step + 1)}`);
  //     stepperContainer.current
  //       .querySelector(`.label${parseInt(step + 1)}`)
  //       .classList.add('active');

  //     stepperContainer.current
  //       .querySelector(`.step${parseInt(step + 1)}`)
  //       .classList.add('active');
  //   } else if (step < prevStep && !stepToPersonalDetails) {
  //     bar.current.classList.remove(`bar${parseInt(prevStep + 1)}`);
  //     stepperContainer.current
  //       .querySelector(`.label${parseInt(prevStep + 1)}`)
  //       .classList.remove('active');

  //     stepperContainer.current
  //       .querySelector(`.step${parseInt(prevStep + 1)}`)
  //       .classList.remove('active');
  //   } else if (step == 0 && stepToPersonalDetails) {
  //     bar.current.classList.remove(`bar${parseInt(step + 2)}`);
  //     bar.current.classList.remove(`bar${parseInt(step + 3)}`);
  //     stepperContainer.current
  //       .querySelector(`.label${parseInt(step + 2)}`)
  //       .classList.remove('active');

  //     stepperContainer.current
  //       .querySelector(`.label${parseInt(step + 3)}`)
  //       .classList.remove('active');

  //     stepperContainer.current
  //       .querySelector(`.step${parseInt(step + 2)}`)
  //       .classList.remove('active');
  //     stepperContainer.current
  //       .querySelector(`.step${parseInt(step + 3)}`)
  //       .classList.remove('active');

  //     setStepToPersonalDetail(false);
  //   }
  // }, [step]);

  return (
    <div className="stepper-container" ref={stepperContainer}>
      <div className="stepper-container__stepper">
        <div
          className={
            step >= 1 ? (step == 1 && 'bar2') || (step == 2 && 'bar3') : 'bar1'
          }
          ref={bar}
        ></div>
        <div className="step step1 active">1</div>
        <div
          className={
            step == 1 || step == 2 ? 'active step step2' : 'step step2'
          }
        >
          2
        </div>
        <div className={step == 2 ? 'active step step3' : 'step step3'}>✓</div>
        <div className="labels__container">
          <label className="label label1 active">Personal</label>
          <label className={step == 1 || step == 2 ? 'active' : 'label label2'}>
            Delivery
          </label>
          <label className={step == 2 ? 'active' : 'label label3'}>
            Payment
          </label>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
