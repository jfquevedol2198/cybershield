import PropTypes from "prop-types";

const Checkbox = ({ disabled = false, id, isSwitch, label, ...rest }) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <input
        className={isSwitch ? "switch" : ""}
        disabled={disabled}
        id={id}
        type="checkbox"
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  isSwitch: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Checkbox;
