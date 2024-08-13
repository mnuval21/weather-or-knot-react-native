import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Location, UseCurrentLocationResult } from './types';
import useLocationPermissions from './useLocationPermissions';

const useCurrentLocation = (): UseCurrentLocationResult => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const permissionGranted = useLocationPermissions();

  useEffect(() => {
    if (permissionGranted === null) {
      console.log('permissionGranted is null');
      return;
    }

    if (!permissionGranted) {
      setError('Location permission denied');
      Alert.alert('Error', 'Location permission is required to access your current location.');
      return;
    }

    if (permissionGranted) {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log({ latitude, longitude });
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
    }
  }, [permissionGranted]);

  console.log('location', location);
  return { location, error };
};

export default useCurrentLocation;