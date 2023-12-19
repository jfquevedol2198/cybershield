import { Tab } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { ChildrenType } from "../../utils/types";

const CustomTap = ({
  className,
  tabActiveClassName,
  tabNormalClassName,
  tabListClassName,
  tabPanelClassName,
  tabs,
  tabPanels,
}) => {
  return (
    <div className={clsx("w-full", className)}>
      <Tab.Group>
        <Tab.List className={clsx("flex space-x-1", tabListClassName)}>
          {tabs.map((tab, index) => (
            <Tab
              key={`tab-${index}`}
              className={({ selected }) =>
                clsx(
                  "px-4 py-2 text-base focus-visible:outline-none",
                  selected ? tabActiveClassName : tabNormalClassName
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className={clsx(tabPanelClassName)}>
          {tabPanels.map((panel, index) => (
            <Tab.Panel key={`panel-${index}`} className={clsx("h-full")}>
              {panel}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

CustomTap.defaultProps = {
  tabActiveClassName: "bg-white text-gray-4",
  tabNormalClassName: "bg-gray-1 text-gray-2",
};

CustomTap.propTypes = {
  className: PropTypes.string,
  tabListClassName: PropTypes.string,
  tabPanelClassName: PropTypes.string,
  tabs: PropTypes.arrayOf(ChildrenType),
  tabPanels: PropTypes.arrayOf(ChildrenType),
  tabActiveClassName: PropTypes.string,
  tabNormalClassName: PropTypes.string,
};

export default CustomTap;
