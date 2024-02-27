import PropTypes from "prop-types";
import { CSVLink } from "react-csv";

import useSearchAndFilter from "../../hooks/useSearchAndFilter";
import { ButtonVariant } from "../../utils";
import Button from "../Button";

const ExportButton = ({ name, label }) => {
  const { filterData } = useSearchAndFilter();
  return (
    <Button variant={ButtonVariant.outline}>
      <CSVLink data={filterData} filename={`${name}.csv`}>
        {label}
      </CSVLink>
    </Button>
  );
};

ExportButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ExportButton;
