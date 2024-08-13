import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';
import { PermissionStatus } from './types';

//we need async storage to store permissions... or is it already being handled by the library?

const useLocationPermissions = () => {
  const [permissionGranted, setPermissionGranted] = useState<PermissionStatus>(null);

  useEffect(() => {
    console.log('useLocationPermissions useEffect');
    const requestPermission = async () => {
      let permissionStatus: PermissionStatus = null;

      if (Platform.OS === 'android') {
        console.log('android');
        permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (permissionStatus !== RESULTS.GRANTED) {
          permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
      } else if (Platform.OS === 'ios') {
        console.log('ios');
        permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (permissionStatus !== RESULTS.GRANTED) {
          permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }
      }

      if (permissionStatus === RESULTS.GRANTED){
        setPermissionGranted('granted');
        console.log('Are you setting it or what???', permissionGranted);
      } else {setPermissionGranted('denied')};
      console.log('permissionStatus in useLocationPermissions', permissionStatus);
      console.log('permissionGranted in useLocationPermissions', permissionGranted);
    };

    requestPermission();
  }, []);

  return permissionGranted;
};

export default useLocationPermissions;