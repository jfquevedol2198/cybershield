import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


export const TabVulnerabilities = ({ value }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/investigate/vulnerabilities')
  }

  return (
    <div className="w-25 h-[6.875rem]" onClick={handleClick}>
      <div className="mb-2 text-base font-normal">Vulnerabilites</div>
      <div className="mb-1 text-[2.75rem] leading-[52px]">{value}</div>
    </div>
  );
};

TabVulnerabilities.propTypes = {
  value: PropTypes.number,
};