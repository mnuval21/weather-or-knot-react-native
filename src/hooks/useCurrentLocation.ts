import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useCurrentLocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null);
        },
        (error) => {
          setError(error.message);
          Alert.alert('Error', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    
  }, []);
  return { location, error };  
};
 export default useCurrentLocation;