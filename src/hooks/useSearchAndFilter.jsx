import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { applyFilter, applySearch } from "../utils/filter";

const SearchAndFilterContext = createContext({});

export const SearchAndFilterProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState([]);
  const [search, setSearch] = useState(null);
  const [pageData, setPageData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setPageData([]);
    setFilterData([]);
  }, [location.pathname]);

  useEffect(() => {
    const params = [];
    let search = null;
    for (let entry of searchParams.entries()) {
      if (entry[0] === "search") {
        search = entry[1];
      } else {
        params.push(entry);
      }
    }
    setParams(params);
    setSearch(search);
  }, [searchParams]);

  useEffect(() => {
    if (pageData && pageData.length > 0) {
      let data = pageData;
      if (search) {
        data = applySearch(data, search);
      }
      if (params.length > 0) {
        data = applyFilter(data, params);
      }
      setFilterData(data);
    }
  }, [params, search, pageData]);

  const onClearAll = () => {
    setSearchParams({});
    setSearch(null);
  };

  const onRemoveItem = (key) => {
    searchParams.delete(key);
    if (key === "search") {
      setSearch(null);
    }
    setSearchParams(searchParams);
  };

  return (
    <SearchAndFilterContext.Provider
      value={{
        search,
        params,
        pageData,
        filterData,
        onClearAll,
        onRemoveItem,
        setPageData,
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
