import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import WeatherComponent from './src/components/WeatherComponent';
import HairAIComponent from './src/components/HairAIComponent';

export default function App() {
  //hair stuffs
  const [frizzForecast, setFrizzForecast] = useState('');

  // const fetchData = async (lat: number, lon: number) => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`,
  //     );
  //     const data = await response.json();
  //     setWeatherData(data);
  //     console.log('weatherData', weatherData); // You can see all the weather data in console log
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // };

  // const fetchFrizzForecast = async (temperature: number, humidity: number) => {
  //   try {
  //     const prompt = `Given the current weather conditions with a temperature of ${temperature}°C and humidity of ${humidity}%, predict if a person's hair is likely to be frizzy. Give suggestions on hair care.`;

  //     const response = await axios.post(
  //       OPENAI_API_URL,
  //       {
  //         model: 'gpt-3.5-turbo', // Use a suitable model
  //         messages: [
  //           {
  //             role: 'system',
  //             content:
  //               'You are a helpful assistant that predicts hair frizz based on weather conditions.',
  //           },
  //           {
  //             role: 'user',
  //             content: prompt,
  //           },
  //         ],
  //         max_tokens: 100,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${OPENAI_API_KEY}`,
  //         },
  //       },
  //     );

  //     const forecast = response.data.choices[0].message.content;
  //     console.log('forecast', forecast);
  //     console.log(OPENAI_API_KEY);
  //     setFrizzForecast(forecast);
  //     return forecast;
  //   } catch (error) {
  //     console.error('Error calling OpenAI API:', error);
  //     throw error;
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //     console.log('loading', loading);
  //     await requestLocationPermission();
  //     const {latitude, longitude} = await getCurrentLocation();
  //     setLocation({latitude, longitude});
  //     console.log('location', location.latitude, location.longitude);
  //     //  call the useWeatherData hook

  //   } catch (error) {
  //     console.error('Error fetching weather data', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //pull down component to refresh weather data
  //
  const handleHairSubmit = () => {
    fetchFrizzForecast(weatherData.main.temp, weatherData.main.humidity);
  };

  return (
    //RefreshControl - to refresh data
    <View style={styles.container}>
      <WeatherComponent />
      <HairAIComponent />
      <StatusBar style="auto" />
    </View>
  );
}

{
  /* {weatherData && weatherData.main && (
        <>
          <Text>Location: {weatherData.name}</Text>
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
      <Text>{frizzForecast}</Text> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
