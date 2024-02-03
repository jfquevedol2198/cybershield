import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const normalizeString = (text) => {
  if (typeof text !== "string") {
    return text;
  }

  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase());
};

export const dateFormat = (date) => {
  if (!date) return "N/A";
  return dayjs(date).format("DD MMM YYYY | HH:mm:ss");
};

export const stringFormat = (text, defaultValue = "-") => {
  return text || defaultValue;
};

export const calculateItemAge = (value) =>  { 
  const initialDate = dayjs(value) || dayjs();
  const creationDate = dayjs(initialDate);
  const currentDateDayjs = dayjs();
  const timeDifferenceDayjs = currentDateDayjs.diff(creationDate, "day");
  const duration = dayjs.duration(currentDateDayjs.diff(creationDate));
  const hours = duration.hours();

  return `${timeDifferenceDayjs}d ${hours}h`;
}
