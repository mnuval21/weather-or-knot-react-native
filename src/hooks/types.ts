//useLocationPermissions
export type PermissionStatus = 'granted' | 'denied' | 'blocked' | 'unavailable' | 'limited' | null;

//useCurrentLocation
export interface Location {
  latitude: number;
  longitude: number;
}

export interface UseCurrentLocationResult {
  location: Location | null;
  error: string | null;
}

//useWeatherData
export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
