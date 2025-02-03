import React from "react";

// Stepper Props
type StepperProps = {
  currentStepIndex: number;
  steps: number;
};

// Stepper Component
const Stepper: React.FC<StepperProps> = ({ currentStepIndex, steps }) => {
  console.log(currentStepIndex, "steps");

  return (
    <div className="w-full flex items-center justify-center gap-4 mb-6">
      {Array.from({ length: steps }, (_, i) => i).map((step) => (
        <div
          key={step}
          className={`flex-1 h-2 rounded-full transition-all duration-300 ease-in-out 
            ${currentStepIndex === step ? "bg-blue-500" : "bg-gray-300"}`}
        ></div>
      ))}
    </div>
  );
};

export default Stepper;
