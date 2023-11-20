import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import { ButtonVariant } from "../../utils";
import AssetsTable from "./AssetsTable";

const Assets = () => {
  return (
    <Fragment>
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            Assets (70)
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button variant={ButtonVariant.outline}>EXPORT ASSETS LIST</Button>
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </NormalButton>
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
        </div>
      </div>
      {/* Content */}
      <div className="gap-4 px-7 py-4">
        <AssetsTable />
      </div>
    </Fragment>
  );
};

export default Assets;
