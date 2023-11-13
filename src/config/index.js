export default {
  isMockEnabled: import.meta.env.VITE_ENV === "test",
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL,
  TOAST_DURATION: 2000,
};
