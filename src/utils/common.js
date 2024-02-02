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

export const calculateItemAge = (created_at) =>  {
  const createdAtDate = new Date(created_at);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentDate - createdAtDate;

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return `${days}d ${hours % 24}h`;
  
}
