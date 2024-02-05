import axios from "axios";
import { useEffect, useState } from "react";

import config from "../config";

const useCountryStateCity = () => {
  // country, state, city
  const [isCountryLoading, setIsCountryLoading] = useState(false);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setIsCountryLoading(true);
      const { data } = await axios.get(
        "https://api.countrystatecity.in/v1/countries",
        {
          headers: {
            "X-CSCAPI-KEY": config.countryStateCityApiKey,
          },
        }
      );
      setCountries(
        data.map((country) => ({ label: country.name, value: country.iso2 }))
      );
      setStates([]);
      setCities([]);
      setIsCountryLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setIsStateLoading(true);
      const { data } = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${country}/states`,
        {
          headers: {
            "X-CSCAPI-KEY": config.countryStateCityApiKey,
          },
        }
      );

      const statesData = data.map((state) => ({
        label: state.name,
        value: state.iso2,
      }));

      // sort states alphabetically
      const sortedStatesData = statesData
        .slice()
        .sort((a, b) => a.label.localeCompare(b.label));

      setStates(sortedStatesData);
      setCities([]);
      setIsStateLoading(false);
    };
    if (country) fetch();
  }, [country]);

  useEffect(() => {
    const fetch = async () => {
      setIsCityLoading(true);
      const { data } = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY": config.countryStateCityApiKey,
          },
        }
      );
      setCities(data.map((city) => ({ label: city.name, value: city.name })));
      setIsCityLoading(false);
    };
    if (country && state) fetch();
  }, [state]);

  return {
    isCountryLoading,
    isStateLoading,
    isCityLoading,
    countries,
    states,
    cities,
    country,
    state,
    city,
    setCountry,
    setState,
    setCity,
  };
};
export default useCountryStateCity;
