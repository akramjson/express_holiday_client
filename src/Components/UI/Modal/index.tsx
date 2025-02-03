import { ReactNode } from "react";
import { assets } from "../../../assets";
type ModalProps = {
  title: string;
  children: ReactNode;
  // ModalChildrenFooter: ReactNode;
  onClose: () => void;
};

const Modal = ({
  title,
  children,
  // ModalChildrenFooter,
  onClose,
}: ModalProps) => {
  return (
    <div className="min-w-[24rem] max-w-[30rem]  py-2 flex flex-col justify-between bg-white border-[1px] border-[#01012E14] rounded-lg">
      <div className="flex items-center px-3 pb-1 justify-between border-b-[1px] border-[#01012E14]">
        <h2 className="text-lg font-medium">{title}</h2>
        <button className="text-[#CED4DA] text-2xl" onClick={onClose}>
          <assets.closeBtnIcon />
        </button>
      </div>
      <>{children}</>
      {/* <div>{ModalChildrenFooter}</div> */}
    </div>
  );
};

export default Modal;
