import {Button, View, Text} from 'react-native';
import useWeatherData from '../hooks/useWeatherData';
import {kelvinToFahrenheit} from '../helpers/kelvinToFarenheit';
import useOpenAIHairData from '../hooks/useOpenAIHairData';
import {useState} from 'react';

const HairAIComponent = () => {
  const {frizzForecast, frizzLoading} = useOpenAIHairData();

  return (
    <View>
      <Text>Frizz Forecast:</Text>
      {frizzLoading ? <Text>Loading...</Text> : <Text>{frizzForecast}</Text>}
    </View>
  );
};
export default HairAIComponent;
