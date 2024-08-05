import {StatusBar} from 'expo-status-bar';
import {
  Button,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  OPENWEATHERMAP_API_KEY,
  BASE_URL,
  OPENAI_API_KEY,
  OPENAI_API_URL,
} from '@env';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export default function App() {
  const [weatherData, setWeatherData] = useState<any>({});
  const [frizzForecast, setFrizzForecast] = useState('');
  const [location, setLocation] = useState<any>({});

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Weather or Knot Location Permission',
          message:
            'Weather or Knot needs access to your location ' +
            'so we can provide you with the weather forecast.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        //Geolocation.getCurrentPosition(info => console.log(info));
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        console.log('location', location);
        fetchData(latitude, longitude);
      },
      error => alert('Error'),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const fetchData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`,
      );
      const data = await response.json();
      setWeatherData(data);
      console.log('weatherData', weatherData); // You can see all the weather data in console log
    } catch (error) {
      console.error('error', error);
    }
  };

  const fetchFrizzForecast = async (temperature: number, humidity: number) => {
    try {
      const prompt = `Given the current weather conditions with a temperature of ${temperature}°C and humidity of ${humidity}%, predict if a person's hair is likely to be frizzy. Give suggestions on hair care.`;

      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo', // Use a suitable model
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that predicts hair frizz based on weather conditions.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        },
      );

      const forecast = response.data.choices[0].message.content;
      console.log('forecast', forecast);
      console.log(OPENAI_API_KEY);
      setFrizzForecast(forecast);
      return forecast;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  };

  const handleSubmit = () => {
    requestLocationPermission();
    getCurrentLocation();
    //fetchData(37.7749, -122.4194);
  };

  const handleHairSubmit = () => {
    fetchFrizzForecast(weatherData.main.temp, weatherData.main.humidity);
  };

  return (
    <View style={styles.container}>
      <Text>"Weather or Knot"</Text>
      <Text>Today's Weather:</Text>
      <Button title="Get Weather" onPress={handleSubmit} />

      {/* <Text>Temperature: {weatherData}°C</Text> */}
      {weatherData && weatherData.main && (
        <>
          <Text>
            Temperature:{' '}
            {Math.round(((weatherData.main.temp - 273.15) * 9) / 5 + 32)}°F
          </Text>
          <Text>Humidity: {weatherData.main.humidity}%</Text>
          <Text>Wind Speed: {weatherData.wind.speed} mph</Text>
          <Text>Weather: {weatherData.weather[0].description}</Text>
        </>
      )}
      <Button title="Hair Forecast" onPress={handleHairSubmit} />
      <Text>Frizz Forecast:</Text>
      <Text>{frizzForecast}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
