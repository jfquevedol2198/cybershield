import { FunnelIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import api from "../../api";
import ActivityIndicator from "../../components/ActivityIndicator";
import ExportButton from "../../components/ExportButton";
import SearchInput from "../../components/SearchInput";
import useCommon from "../../hooks/useCommon";
import { parseAssets } from "../../utils/parse";
import AssetsTable from "../Assets/AssetsTable";

const Assets = () => {
  const [searchParams] = useSearchParams();
  const cellId = searchParams.get("cellId");
  const cellName = searchParams.get("cellName");
  const { siteId } = useParams();
  const { sites } = useCommon();

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
                <Link
                  to={`/dashboard/site/${siteId}/cells`}
                  className="text-link"
                >
                  All Cells
                </Link>
                {" > "}
                <span>{cellName}</span>{" "}
              </>
            ) : (
              <>{sites.find((site) => site.id === siteId).name_}</>
            )}
            &gt; Assets ({assets.length})
          </span>
        </div>

        {loading && <ActivityIndicator />}

        <div className="flex flex-row items-center gap-4">
          <ExportButton name="shops" label="EXPORT SHOPS LIST" />
          <SearchInput />
        </div>
      </div>
      <div className="mt-2 w-full overflow-x-auto px-5">
        <AssetsTable data={assets} loading={loading} />
      </div>
    </Fragment>
  );
};

export default Assets;
