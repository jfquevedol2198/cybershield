import { Fragment, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import api from "../../api";
import ActivityIndicator from "../../components/ActivityIndicator";
import ExportButton from "../../components/ExportButton";
import SearchAndFilter from "../../components/SearchAndFilter";
import SearchInput from "../../components/SearchInput";
import useCommon from "../../hooks/useCommon";
import useSearchAndFilter from "../../hooks/useSearchAndFilter";
import { parseAssets } from "../../utils/parse";
import AssetsTable from "./AssetsTable";

const Assets = () => {
  const [searchParams] = useSearchParams();
  const cellId = searchParams.get("cellId");
  const cellName = searchParams.get("cellName");
  const { siteId } = useParams();
  const { sites } = useCommon();

  const [loading, setLoading] = useState(false);

  const { setPageData, filterData } = useSearchAndFilter();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await api.getSiteAssets(siteId);
      setPageData(parseAssets(data));
      setLoading(false);
    };
    fetch();
  }, [siteId]);

  return (
    <Fragment>
      {loading && <ActivityIndicator />}
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
            &gt; Assets ({filterData.length})
          </span>
        </div>

        <div className="flex flex-row items-center gap-4">
          <ExportButton name="shops" label="EXPORT SHOPS LIST" />
          <SearchInput />
        </div>
      </div>
      <div className="mb-4 px-4">
        <SearchAndFilter />
      </div>
      <div className="mt-2 w-full overflow-x-auto px-5">
        <AssetsTable data={filterData} loading={loading} />
      </div>
    </Fragment>
  );
};

export default Assets;
