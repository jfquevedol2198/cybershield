import { Fragment, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import api from "../../api8000";
import ActivityIndicator from "../../components/ActivityIndicator";
import BreadCrumb from "../../components/BreadCrumb";
import ExportButton from "../../components/ExportButton";
import SearchAndFilter from "../../components/SearchAndFilter";
import SearchInput from "../../components/SearchInput";
import useSearchAndFilter from "../../hooks/useSearchAndFilter";
import { parseAssets } from "../../utils/parse";
import AssetsTable from "../Assets/AssetsTable";

const Assets = () => {
  const [searchParams] = useSearchParams();
  const shopId = searchParams.get("shopId");
  const shopName = searchParams.get("shopName");
  const cellId = searchParams.get("cellId");
  const cellName = searchParams.get("cellName");
  const { siteId } = useParams();

  const [loading, setLoading] = useState(false);

  const { setPageData, filterData } = useSearchAndFilter();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await api.getAssetsView(siteId, cellId);
      setPageData(parseAssets(data));
      setLoading(false);
    };
    fetch();
  }, [siteId, cellId]);

  return (
    <Fragment>
      {loading && <ActivityIndicator />}
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <BreadCrumb
          data={[
            cellId && cellName
              ? {
                  label: "All Cells",
                  url: `/dashboard/site/${siteId}/cells`,
                }
              : undefined,
            shopId && shopName
              ? {
                  label: shopName,
                  url: `/dashboard/site/${siteId}/cells?shopId=${shopId}&shopName=${shopName}`,
                }
              : undefined,
            cellId && cellName
              ? {
                  label: cellName,
                }
              : undefined,
            { label: `Assets (${filterData.length})` },
          ].filter((v) => v !== undefined)}
        />

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
