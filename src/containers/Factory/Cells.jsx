import { FunnelIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import api from "../../api";
import Button from "../../components/Button";
import FactoryShopCell from "../../components/FactoryShopCell";
import NormalButton from "../../components/NormalButton";
import SearchInput from "../../components/SearchInput";
import { ButtonVariant } from "../../utils";
import { applyFilter, getFilterOptions } from "../../utils/filter";
import { parseCells } from "../../utils/parse";
import FilterCells from "./FilterCells";

const Cells = () => {
  const [searchParams] = useSearchParams();
  const shopId = searchParams.get("shopId");
  const shopName = searchParams.get("shopName");

  const [loading, setLoading] = useState(false);

  const [cells, setCells] = useState([]);
  const [filteredCells, setFilteredCells] = useState([]);
  const [filterCellOptions, setFilterCellOptions] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await (shopId
        ? api.getCellsOfShop({ shopId })
        : api.getSiteCells());
      const cells = parseCells(data);
      setCells(cells);
      setFilteredCells(cells);
      setFilterCellOptions(getFilterOptions(cells));
      setLoading(false);
    };
    fetch();
  }, [shopId]);

  const onFilterCells = (data) => {
    const filtered = Object.keys(data).filter((key) => !!data[key]);
    if (filtered.length === 0) return;
    setFilteredCells(
      applyFilter(
        cells,
        filtered.reduce(
          (filter, key) => [...filter, { key, value: data[key] }],
          []
        )
      )
    );
    setIsFilterOpen(false);
  };

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-3 flex flex-row items-center justify-between bg-background px-8">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[1.625rem] font-bold text-gray-4">
            {shopId && shopName ? (
              <>
                <Link to="/dashboard/factory-1/shops" className="text-link">
                  All Shops
                </Link>
                {" > "}
                <>{shopName}</>
              </>
            ) : (
              <>Cells</>
            )}
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button variant={ButtonVariant.outline}>EXPORT CELLS LIST</Button>
          <SearchInput onSearch={() => {}} />
          <NormalButton
            variant={ButtonVariant.icon}
            className="h-full"
            onClick={() => setIsFilterOpen(true)}
          >
            <FunnelIcon className="h-6 w-6" />
          </NormalButton>
        </div>
      </div>
      {loading && (
        <div className="flex h-full w-full items-center justify-center">
          Loading
        </div>
      )}
      <div className="mt-2 grid w-full grid-cols-1 gap-4 overflow-x-auto px-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredCells.map((cell) => {
          return (
            <Link
              key={cell.description}
              to={`/dashboard/factory-1/assets?cellId=${cell.id}&cellName=${cell.name}`}
            >
              <FactoryShopCell
                name={cell.name}
                description={cell.description}
                score={cell.riskScore * 100}
                location={cell.location}
                assets={cell.assets}
              />
            </Link>
          );
        })}
      </div>
      <FilterCells
        isOpen={isFilterOpen}
        filterOptions={filterCellOptions}
        onSubmit={onFilterCells}
        onClose={() => setIsFilterOpen(false)}
      />
    </Fragment>
  );
};

export default Cells;
