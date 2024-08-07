import { useState, useEffect } from 'react';
import { OPENWEATHERMAP_API_KEY, BASE_URL } from '@env';

const useWeatherData = async (lat: number | null, lon: number | null) => {
  const [weatherData, setWeatherData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    if (lat === null || lon === null) return;

      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`,
          );
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error('error', error);
        } finally {
          setLoading(false);
        }
      };
      fetchWeatherData();
    }, [lat, lon]);
  return {weatherData, loading};
};

export default useWeatherData;