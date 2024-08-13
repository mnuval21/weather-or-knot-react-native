import {Button, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useWeatherData from '../hooks/useWeatherData';
import {kelvinToFahrenheit} from '../helpers/kelvinToFarenheit';

const WeatherComponent = () => {
  const {weatherData, loading} = useWeatherData();

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>"Weather or Knot</Text>
      {weatherData ? (
        <>
          <Text>City: {weatherData.name}</Text>
          <Text>
            Temperature: {kelvinToFahrenheit(weatherData?.main?.temp)}°F
          </Text>
          <Text>
            Feels Like: {kelvinToFahrenheit(weatherData.main.feels_like)}°F
          </Text>
          <Text>Humidity: {weatherData.main.humidity}%</Text>
          <Text>Wind Speed: {weatherData.wind.speed} mph</Text>
          <Text>Condition: {weatherData.weather[0].description}</Text>
        </>
      ) : (
        <Text>Loading..</Text>
      )}
    </View>
  );
};

export default WeatherComponent;
