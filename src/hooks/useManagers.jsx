import { useState, useEffect } from 'react';
import api from '../api8000'

const parsedManagersData = (data) => {
  return data.map((item) => ({
    label: item.name,
    value: item.sys_id,
  }));
};

const useManagers = () => {
  const [managers, setManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagers = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.getManagers();
        setManagers(parsedManagersData(data));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManagers();
    return () => {};
  }, []);

  return { managers, isLoading, error };
};

export default useManagers;
