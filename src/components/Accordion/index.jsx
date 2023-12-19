import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { ChildrenType } from "../../utils/types";

const Accordion = ({
  title,
  headerClassName,
  bodyClassName,
  children,
  defaultOpen = true,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => setIsOpened(defaultOpen), [defaultOpen]);

  return (
    <div className="w-full">
      <div
        className={clsx(
          "flex cursor-pointer flex-row items-center gap-2",
          headerClassName
        )}
        onClick={() => setIsOpened(!isOpened)}
      >
        {isOpened && <ChevronUpIcon className="w-6" />}
        {!isOpened && <ChevronDownIcon className="w-6" />}
        <span className="text-base font-bold text-gray-4">{title}</span>
      </div>
      {isOpened && <div className={bodyClassName}>{children}</div>}
    </div>
  );
};

Accordion.propTypes = {
  defaultOpen: PropTypes.bool,
  title: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  children: ChildrenType,
};

export default Accordion;
