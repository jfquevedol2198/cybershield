import { FunnelIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import api from "../../api";
import Button from "../../components/Button";
import NormalButton from "../../components/NormalButton";
import SearchInput from "../../components/SearchInput";
import { ButtonVariant } from "../../utils";
import { parseAssets } from "../../utils/parse";
import AssetsTable from "../Assets/AssetsTable";

const Assets = () => {
  const [searchParams] = useSearchParams();
  const cellId = searchParams.get("cellId");
  const cellName = searchParams.get("cellName");

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await api.getAssets({});
      setAssets(parseAssets(data));
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
            {cellId && cellName ? (
              <>
                <Link to={`/dashboard/factory-1/cells`} className="text-link">
                  All Cells
                </Link>
                {" > "}
                <span>{cellName}</span>{" "}
              </>
            ) : (
              <>Factory 1</>
            )}
            &gt; Assets ({assets.length})
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button variant={ButtonVariant.outline}>EXPORT SHOPS LIST</Button>
          <SearchInput onSearch={() => {}} />
          <NormalButton variant={ButtonVariant.icon} className="h-full">
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
        </div>
      </div>
      <div className="mt-2 w-full overflow-x-auto px-5">
        <AssetsTable data={assets} loading={loading} />
      </div>
    </Fragment>
  );
};

export default Assets;
