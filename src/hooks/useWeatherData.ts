import { useState, useEffect } from 'react';
import { OPENWEATHERMAP_API_KEY, BASE_URL } from '@env';
import useCurrentLocation from './useCurrentLocation';
import { WeatherData } from './types';

const useWeatherData = () => {
  const { location } = useCurrentLocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    if (location?.latitude === null || location?.longitude === null) return;

      const fetchWeatherData = async () => {
        if(location && location.latitude && location.longitude) {
          try {
            setLoading(true);
            const response = await fetch(
              `${BASE_URL}?lat=${location?.latitude}&lon=${location?.longitude}&appid=${OPENWEATHERMAP_API_KEY}`,
            );
            const data: WeatherData = await response.json();
            setWeatherData(data);
          } catch (error) {
            console.error('error', error);
          } finally {
            setLoading(false);
          } 
        } else {
          console.log('location is null');
        }
      };

    fetchWeatherData();
  }, [location]);
    console.log('weatherData', weatherData);
  return {weatherData, loading};
};

export default useWeatherData;