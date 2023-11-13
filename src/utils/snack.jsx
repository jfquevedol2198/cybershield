import clsx from "clsx";
import toast from "react-hot-toast";

import ErrorSvg from "../assets/images/error.svg";
import EventSvg from "../assets/images/event.svg";
import InformationSvg from "../assets/images/information.svg";
import SuccessSvg from "../assets/images/success.svg";
import config from "../config";

const BASE_CLASSNAME =
  "shadow-toast border-[1px] rounded p-4 text-base text-primary-text";

const snack = {
  success: (message) => {
    toast.success(message, {
      className: clsx(BASE_CLASSNAME, "border-success bg-success "),
      icon: <img src={SuccessSvg} alt="" />,
      duration: config.TOAST_DURATION,
    });
  },
  event: (message) => {
    toast.success(message, {
      className: clsx(BASE_CLASSNAME, "border-event bg-event "),
      icon: <img src={EventSvg} alt="" />,
      duration: config.TOAST_DURATION,
    });
  },
  info: (message) => {
    toast.success(message, {
      className: clsx(BASE_CLASSNAME, "border-info bg-info "),
      icon: <img src={InformationSvg} alt="" />,
      duration: config.TOAST_DURATION,
    });
  },
  error: (message) => {
    toast.error(message, {
      className: clsx(BASE_CLASSNAME, "border-error bg-error-1 "),
      icon: <img src={ErrorSvg} alt="" />,
      duration: config.TOAST_DURATION,
    });
  },
};

export default snack;
