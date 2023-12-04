import PropTypes from "prop-types";

const Radio = ({ disabled = false, id, label, ...rest }) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <input disabled={disabled} id={id} type="radio" {...rest} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

Radio.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Radio;
