import dayjs from "dayjs";
import PropTypes from "prop-types";

import Tag, { TagVariant } from "../../../../components/Tag";

const AlertStatusTab = () => {
  return <div>Alert status</div>;
};

const AlertStatusTabPanel = ({ data }) => {
  return (
    <div className="w-full">
      <div className="bg-white p-5">
        <div className="mb-3 flex flex-row gap-2">
          <span className="text-base font-bold text-black">Alert status</span>
          <Tag variant={TagVariant.content} label={data.status} />
        </div>
        <div className="mb-3">
          <span className="text-base font-bold text-black">Alert History</span>
        </div>
        <div className="mb-3">
          <div className="text-base font-normal text-gray-4">
            New Alert was modified.
          </div>
          <div className="text-base font-normal text-gray-4">
            {dayjs(data.updated_at).format("DD MMM YYYY | HH:mm:ss")}
          </div>
        </div>
        <div>
          <div className="text-base font-normal text-gray-4">
            New Alert was created.
          </div>
          <div className="text-base font-normal text-gray-4">
            {dayjs(data.created_at).format("DD MMM YYYY | HH:mm:ss")}
          </div>
        </div>
      </div>
    </div>
  );
};

AlertStatusTabPanel.defaultProps = {
  data: {},
};

AlertStatusTabPanel.propTypes = {
  data: PropTypes.shape(PropTypes.any),
};

export { AlertStatusTab, AlertStatusTabPanel };
