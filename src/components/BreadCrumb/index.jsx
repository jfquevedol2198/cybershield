import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BreadCrumb = ({ data = [] }) => {
  if (data.length === 0) return <></>;
  return (
    <div className="flex flex-row items-center gap-2 text-[1.625rem] font-bold">
      {data.map((item, index) => {
        if (index === data.length - 1) return <span>{item.label}</span>;
        return (
          <>
            {item.url && (
              <Link to={item.url} className="text-link">
                {item.label}
              </Link>
            )}
            {!item.url && <span>{item.label}</span>}
            <span className="mx-2">&gt;</span>
          </>
        );
      })}
    </div>
  );
};

BreadCrumb.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)),
};

export default BreadCrumb;
