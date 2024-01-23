import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { applyFilter, applySearch } from "../utils/filter";

const SearchAndFilterContext = createContext({});

export const SearchAndFilterProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState([]);
  const [search, setSearch] = useState(null);
  const [pageData, setPageData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const location = useLocation();
  const hasFilterAndSearch = !!search || filterParams.length > 0;

  useEffect(() => {
    setPageData([]);
    setFilterData([]);
  }, [location.pathname]);

  useEffect(() => {
    const filterParams = [];
    let search = null;
    for (let entry of searchParams.entries()) {
      if (entry[0] === "search") {
        search = entry[1];
      } else {
        if (entry[0].indexOf("filter_") > -1)
          filterParams.push({ key: entry[0].slice(7), value: entry[1] });
      }
    }
    setFilterParams(filterParams);
    setSearch(search);
  }, [searchParams]);

  useEffect(() => {
    if (pageData && pageData.length > 0) {
      let data = pageData;
      if (search) {
        data = applySearch(data, search);
      }
      if (filterParams.length > 0) {
        data = applyFilter(data, filterParams) || [];
      }
      setFilterData(data);
    }
  }, [filterParams, search, pageData]);

  const onClearAll = () => {
    setSearchParams({});
    setSearch(null);
  };

  const onRemoveItem = (key) => {
    if (key === "search") {
      searchParams.delete(key);
      setSearch(null);
      return;
    }
    searchParams.delete(`filter_${key}`);
    setSearchParams(searchParams);
  };

  const addFilter = (data) => {
    const arrFilter = Object.keys(data)
      .filter((key) => !!data[key])
      .map((key) => ({ key, value: data[key] }));
    filterParams.forEach((filter) => {
      searchParams.delete(`filter_${filter.key}`);
    });
    arrFilter.forEach((filter) => {
      searchParams.append(`filter_${filter.key}`, filter.value);
    });
    setSearchParams(searchParams);
  };

  return (
    <SearchAndFilterContext.Provider
      value={{
        hasFilterAndSearch,
        search,
        filterParams,
        pageData,
        filterData,
        onClearAll,
        onRemoveItem,
        setPageData,
        addFilter,
      }}
    >
      {children}
    </SearchAndFilterContext.Provider>
  );
};

SearchAndFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useSearchAndFilter() {
  return useContext(SearchAndFilterContext);
}
