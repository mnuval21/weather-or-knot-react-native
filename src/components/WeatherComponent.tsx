import {Button, Text, View} from 'react-native';
import React, {useState} from 'react';

const WeatherComponent = () => {
  const handleSubmit = () => {
    console.log('handleSubmit');
  };

  return (
    <View>
      <Text>"Weather or Knot"</Text>
      <Text>Today's Weather:</Text>
      <Text></Text>
    </View>
  );
};

export default WeatherComponent;
