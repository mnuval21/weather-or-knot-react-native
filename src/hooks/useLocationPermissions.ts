import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, check, request } from 'react-native-permissions';

//persist permissions - use async storage?
const useLocationPermissions = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

  useEffect(() => {
    //check if permission is granted and stored if not request
    //check package and check if this is handled
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const permissionAndroid = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (permissionAndroid !== 'granted') {
          const requestResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (requestResult !== 'granted') {
            console.log('Location permission denied');
            setPermissionGranted(false);
            return;
          }
        }
        setPermissionGranted(true);
      } else if (Platform.OS === 'ios') {
        const permissionIOS = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (permissionIOS !== 'granted') {
          const requestResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (requestResult !== 'granted') {
            console.log('Location permission denied');
            setPermissionGranted(false);
            return;
          }
        }
        setPermissionGranted(true);
      }
    };

    requestPermission();
    
  }, []);
  console.log('permissionGranted', permissionGranted);
  return permissionGranted;
};

export default useLocationPermissions;