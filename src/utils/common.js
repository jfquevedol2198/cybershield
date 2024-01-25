export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const normalizeString = (text) => {
  if (typeof text !== "string") {
    return text;
  }

  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase());
};
