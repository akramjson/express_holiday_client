import { IconType } from "react-icons";
// Lu
import { LuPhone } from "react-icons/lu";
// ===========================================
// ai
import { AiOutlineGlobal } from "react-icons/ai";
// ================================================
// io
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdCheckmarkCircleOutline,
  IoMdClose,
} from "react-icons/io";
// ==============================================================
// io5
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoLockOpenOutline,
  IoMailOpenOutline,
} from "react-icons/io5";
// ====================================================================
// md
import { MdOutlineDoneOutline, MdOutlineEmail } from "react-icons/md";
// ====================================================================
// bi
import { BiMessageSquareError } from "react-icons/bi";
// ====================================================================
import { FaRegHourglass } from "react-icons/fa";

type Assets = {
  logo: string;
  airplane: string;
  manageTicket: string;
  ticket: string;
  globalIcon: IconType;
  arrowDownIcon: IconType;
  arrowUpIcon: IconType;
  openeyeIcon: IconType;
  closeeyeIcon: IconType;
  passwordIcon: IconType;
  emailIcon: IconType;
  phoneIcon: IconType;
  doneIcon: IconType;
  errIcon: IconType;
  closeBtnIcon: IconType;
  openStatusIcon: IconType;
  pendingStatusIcon: IconType;
  closedStatusIcon: IconType;
};

export const assets: Assets = {
  logo: "/imgs/Logo.svg",
  manageTicket: "/imgs/ticket.png",
  airplane: "/imgs/airplane.svg",
  ticket: "/imgs/ticket.svg",
  globalIcon: AiOutlineGlobal,
  arrowDownIcon: IoIosArrowDown,
  arrowUpIcon: IoIosArrowUp,
  openeyeIcon: IoEyeOutline,
  closeeyeIcon: IoEyeOffOutline,
  passwordIcon: IoLockOpenOutline,
  emailIcon: MdOutlineEmail,
  phoneIcon: LuPhone,
  doneIcon: IoMdCheckmarkCircleOutline,
  errIcon: BiMessageSquareError,
  closeBtnIcon: IoMdClose,
  openStatusIcon: IoMailOpenOutline,
  pendingStatusIcon: FaRegHourglass,
  closedStatusIcon: MdOutlineDoneOutline,
};
