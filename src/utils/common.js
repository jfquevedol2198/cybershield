import dayjs from "dayjs";

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
