import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import WeatherComponent from './src/components/WeatherComponent';
import HairAIComponent from './src/components/HairAIComponent';

export default function App() {
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
