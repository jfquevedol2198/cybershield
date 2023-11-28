import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import { Fragment, useEffect, useState } from "react";

import api from "../../api";
import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import { ButtonVariant } from "../../utils";
import { parseAssets } from "../../utils/parse";
import AssetsTable from "../Assets/AssetsTable";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const {
        data: { data },
      } = await api.getAssets();
      setCurrPage(_.get(data, "currentPage"));
      setTotalPages(_.get(data, "totalPages"));
      setAssets(parseAssets(_.get(data, "assets")));
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            Factory 1 &gt; Assets ({assets.length})
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button variant={ButtonVariant.outline}>EXPORT SHOPS LIST</Button>
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </NormalButton>
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
        </div>
      </div>
      <div className="mt-2 w-full overflow-x-auto px-5">
        <AssetsTable
          currPage={currPage}
          totalPages={totalPages}
          data={assets}
          loading={loading}
        />
      </div>
    </Fragment>
  );
};

export default Assets;
