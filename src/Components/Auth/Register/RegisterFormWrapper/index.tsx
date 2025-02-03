import { ReactNode } from "react";
import { Stepper } from "../../../UI";

type FormWrapperProps = {
  children: ReactNode;
  currentStepIndex: number;
};

const RegisterFormWrapper = ({
  children,
  currentStepIndex,
}: FormWrapperProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Stepper steps={2} currentStepIndex={currentStepIndex} />
      <div className="w-full flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default RegisterFormWrapper;
