export default {
  isMockEnabled: import.meta.env.VITE_ENV === "test",
  BASE_API_URL_8000: import.meta.env.VITE_BASE_API_URL_8000,
  BASE_API_URL_8080: import.meta.env.VITE_BASE_API_URL_8080,
  BASE_API_URL_8089: import.meta.env.VITE_BASE_API_URL_8089,
  TOAST_DURATION: 10000, // todo: update for demo purposes. set back to 2000 later on.
  userPoolClientID: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
  userPoolID: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  awsAccessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  countryStateCityApiKey: import.meta.env.VITE_COUNTRY_STATE_CITY_API_KEY,
  serviceNowAuthUsername: import.meta.env.VITE_SERVICE_NOW_AUTH_USERNAME,
  serviceNowAuthPassword: import.meta.env.VITE_SERVICE_NOW_AUTH_PASSWORD,
  imgbbApiKey: import.meta.env.VITE_IMGBB_API_KEY,
};
