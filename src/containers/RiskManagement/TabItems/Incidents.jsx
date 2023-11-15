import PropTypes from "prop-types";

export const TabIncidents = ({ value }) => {
  return (
    <div className="w-25 h-[6.875rem]">
      <div className="mb-2 text-base font-normal">Incidents</div>
      <div className="mb-1 text-[2.75rem] leading-[52px]">{value}</div>
    </div>
  );
};

TabIncidents.propTypes = {
  value: PropTypes.number,
};

export const PanelIncidents = () => {
  return <div className="">Incidents</div>;
};
