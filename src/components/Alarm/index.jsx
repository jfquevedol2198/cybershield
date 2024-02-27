import clsx from "clsx";
import PropTypes from "prop-types";

import ErrorSvg from "../../assets/images/error.svg";
import EventSvg from "../../assets/images/event.svg";
import InformationSvg from "../../assets/images/information.svg";
import SuccessSvg from "../../assets/images/success.svg";

export const AlarmType = {
  success: "success",
  event: "event",
  info: "info",
  error: "error",
};

const Info = {
  success: {
    className: "border-success bg-success",
    icon: SuccessSvg,
  },
  event: {
    className: "border-event bg-event",
    icon: EventSvg,
  },
  info: {
    className: "border-info bg-info",
    icon: InformationSvg,
  },
  error: {
    className: "border-error bg-error-1",
    icon: ErrorSvg,
  },
};

const Alarm = ({ className, message, type }) => {
  return (
    <div
      className={clsx(
        "flex flex-row items-center gap-2 rounded border p-4 text-base text-primary-text shadow-toast",
        className,
        Info[type].className
      )}
    >
      <img src={Info[type].icon} alt="" />
      <div>{message}</div>
    </div>
  );
};

Alarm.defaultProps = {
  className: "",
  type: AlarmType.success,
};

Alarm.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Alarm;
