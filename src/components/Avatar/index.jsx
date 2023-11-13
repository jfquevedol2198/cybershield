import clsx from "clsx";
import PropTypes from "prop-types";

import AvatarPlaceholderSvg from "../../assets/images/avatar-placeholder.svg";
import { SizeVariant } from "../../utils";

const Avatar = ({ className, url, size }) => {
  return (
    <img
      src={url || AvatarPlaceholderSvg}
      className={clsx("avatar", className, size)}
      alt="avatar"
    />
  );
};

Avatar.defaultProps = {
  className: "",
  url: "",
  size: SizeVariant.medium,
};

Avatar.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  size: PropTypes.string,
};

export default Avatar;
