import React from 'react';

const StepCounter = ({ step, stepTitles }) => {
  return (
    <div>
      {(step == 0 || step == 1 || step == 2) && (
        <div className="step-info">
          <label className="step-value">{`STEP ${step + 1}`}</label>
          <label className="step-title">{stepTitles[step]}</label>
        </div>
      )}
    </div>
  );
};

export default StepCounter;
