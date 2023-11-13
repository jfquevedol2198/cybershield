import toast from "react-hot-toast";

import ErrorSvg from "../assets/images/error.svg";
import EventSvg from "../assets/images/event.svg";
import InformationSvg from "../assets/images/information.svg";
import SuccessSvg from "../assets/images/success.svg";
import config from "../config";

const snack = {
  success: (message) => {
    toast.success(message, {
      className:
        "bg-success shadow-toast border-2 border-success rounded p-4 text-base text-primary-text",
      icon: <img src={SuccessSvg} alt="" />,
      duration: config.TOAST_DURATION,
    });
  },
  event: (message) => {
    toast.success(message, {
      className:
        "bg-event shadow-toast border-1 border-event rounded p-4 text-base text-primary-text",
      icon: <img src={EventSvg} alt="" />,
      duration: config.TOAST_DURATION,
    });
  },
  info: (message) => {
    toast.success(message, {
      className:
        "bg-info shadow-toast border-2 border-info rounded p-4 text-base text-primary-text",
      icon: <img src={InformationSvg} alt="" />,
      duration: config.TOAST_DURATION,
    });
  },
  error: (message) => {
    toast.error(message, {
      className:
        "bg-error-1 shadow-toast border-2 border-error rounded p-4 text-base text-primary-text",
      icon: <img src={ErrorSvg} alt="" />,
      duration: config.TOAST_DURATION,
    });
  },
};

export default snack;
