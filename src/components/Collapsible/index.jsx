import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { useState } from "react";

import { ChildrenType } from "../../utils/types";

const Collapsible = ({ children, showCount }) => {
  const [isShowFull, setIsShowFull] = useState(false);
  return (
    <>
      {children.slice(0, isShowFull ? children.length : showCount)}
      <span
        className="flex cursor-pointer flex-row gap-2 text-link"
        onClick={() => setIsShowFull(!isShowFull)}
      >
        {isShowFull && <MinusIcon className="w-6" />}
        {!isShowFull && <PlusIcon className="w-6" />}
        {isShowFull && <>Show less</>}
        {!isShowFull && <>Show more</>}
      </span>
    </>
  );
};

Collapsible.defaultProps = {
  showCount: 2,
};

Collapsible.propTypes = {
  children: PropTypes.arrayOf(ChildrenType),
  showCount: PropTypes.number,
};

export default Collapsible;
