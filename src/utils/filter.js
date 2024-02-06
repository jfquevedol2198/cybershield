import dayjs from "dayjs";

import { getRiskLevel } from "./risk";

export const getFilterOptions = (data) => {
  if (!data) return {};
  const filterOptions = {};
  Object.keys(data[0]).map((key) => {
    const values = data.map((d) => d[key]);
    const _values = values.reduce(
      (options, value) =>
        !value || options.indexOf(value) > -1 || value === "-" || value === ""
          ? options
          : [...options, value],
      []
    );
    filterOptions[key] =
      _values.length === 0 || (_values.length === 1 && _values[0] === "-")
        ? null
        : ["*", ..._values];
  });
  return filterOptions;
};

export const DateFilterOptions = [
  {
    label: "None",
    value: "date_range_none",
  },
  {
    label: "Last Hour",
    value: "date_range_last_hour",
  },
  {
    label: "Last Day",
    value: "date_range_last_day",
  },
  {
    label: "Last Week",
    value: "date_range_last_week",
  },
  {
    label: "Last 30 days",
    value: "date_range_last_30_days",
  },
  {
    label: "Older than 30 days",
    value: "date_range_last_older_30_days",
  },
];

export const DateFilterRangeData = {
  date_range_none: { max: new Date() },
  date_range_last_hour: {
    min: dayjs().subtract(1, "hour").toDate(),
    max: new Date(),
  },
  date_range_last_day: {
    min: dayjs().subtract(1, "day").toDate(),
    max: new Date(),
  },
  date_range_last_week: {
    min: dayjs().subtract(1, "week").toDate(),
    max: new Date(),
  },
  date_range_last_30_days: {
    min: dayjs().subtract(1, "30").toDate(),
    max: new Date(),
  },
  date_range_last_older_30_days: {
    min: null,
    max: dayjs().subtract(30, "day").toDate(),
  },
};

export const applySearch = (data, search) => {
  if (!data) return [];
  if (!search) return data;

  const lowSearch = search.toLowerCase();
  return data.reduce(
    (_data, row) =>
      Object.keys(row).filter((key) => {
        const value = `${row[key]}`;
        return value.toLowerCase().indexOf(lowSearch) > -1;
      }).length > 0
        ? [..._data, row]
        : _data,
    []
  );
};

export const applyFilter = (data, filterOptions) => {
  let filteredData = data;
  filterOptions.forEach((option) => {
    if (option.value) {
      const type = typeof option.value;
      filteredData = filteredData.filter((d) => {
        if (!d[option.key] && d[option.key] !== 0) return false;
        if (type === "string") {
          if (option.value.indexOf("date_range_") === 0) {
            const { min, max } = DateFilterRangeData[option.value];
            if (!d[option.key]) return false;

            const t = new Date(d[option.key]);
            if (!min && !max) {
              const minDate = new Date(min);
              const maxDate = new Date(max);
              return t >= minDate && t <= maxDate;
            }
            if (!min && max) {
              const maxDate = new Date(max);
              return t <= maxDate;
            }
            if (min && !max) {
              const minDate = new Date(min);
              return t >= minDate;
            }
            return false;
          }
          if (
            option.key === "risk_score" ||
            option.key === "severity" ||
            option.key === "cvescore"
          ) {
            const level = getRiskLevel(d[option.key]);
            return level === option.value;
          }
          return (
            option.value === "*" ||
            `${d[option.key]}`
              .toLowerCase()
              .indexOf(option.value.toLowerCase()) > -1
          );
        }
        if (type === "object" && !option.value[0]) {
          return option.value.indexOf(d[option.key]) > -1;
        }
        return false;
      });
    }
  });
  return filteredData;
};
