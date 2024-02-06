import { SortDataType, SortDirection } from "./constants";

export const sortFunc = (arr, sort) => {
  console.log(sort);
  return arr.sort((a, b) => {
    if (sort.type === SortDataType.Number) {
      return sort.direction === SortDirection.ASC
        ? b[sort.key] - a[sort.key]
        : a[sort.key] - b[sort.key];
    } else if (sort.type === SortDataType.Date) {
      return sort.direction === SortDirection.ASC
        ? new Date(a[sort.key]) - new Date(b[sort.key])
        : new Date(b[sort.key]) - new Date(a[sort.key]);
    } else {
      return sort.direction === SortDirection.ASC
        ? (a[sort.key] || "").localeCompare(b[sort.key] || "")
        : (b[sort.key] || "").localeCompare(a[sort.key] || "");
    }
  });
};
