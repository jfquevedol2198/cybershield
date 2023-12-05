import dayjs from "dayjs";

export const getFilterOptions = (data) => {
  const filterOptions = {};
  Object.keys(data[0]).map((key) => {
    const values = data.map((d) => d[key]);
    const _values = values.reduce(
      (options, value) =>
        !value || options.indexOf(value) > -1 ? options : [...options, value],
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
    value: { max: new Date() },
    key: "none",
  },
  {
    label: "Last Hour",
    value: { min: dayjs().subtract(1, "hour").toDate(), max: new Date() },
    key: "last_hour",
  },
  {
    label: "Last Day",
    value: { min: dayjs().subtract(1, "day").toDate(), max: new Date() },
    key: "last_day",
  },
  {
    label: "Last Week",
    value: { min: dayjs().subtract(1, "week").toDate(), max: new Date() },
    key: "last_week",
  },
  {
    label: "Last 30 days",
    value: { min: dayjs().subtract(1, "30").toDate(), max: new Date() },
    key: "last_30_days",
  },
  {
    label: "Older than 30 days",
    value: { min: null, max: dayjs().subtract(30, "day").toDate() },
    key: "last_older_30_days",
  },
];

export const applyFilter = (data, filterOptions) => {
  let filteredData = data;
  filterOptions.forEach((option) => {
    if (option.value) {
      const type = typeof option.value;
      filteredData = filteredData.filter((d) => {
        if (!d[option.key]) return false;
        if (type === "string") {
          return (
            d[option.key] === "*" || d[option.key].indexOf(option.value) > -1
          );
        } else if (type === "object" && !option.value[0]) {
          return option.value.indexOf(d[option.key]) > -1;
        } else {
          const { min, max } = option.value;
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
      });
    }
  });
  return filteredData;
};
