import { useEffect, useState } from 'react';
import { OPENAI_API_KEY, OPENAI_API_URL } from '@env';
import useWeatherData from './useWeatherData';
import { kelvinToFahrenheit } from '../helpers/kelvinToFarenheit';

//WIP
const useOpenAIHairData = () => {
  const { weatherData, loading} = useWeatherData();
  const [frizzForecast, setFrizzForecast] = useState<string | null>(null);
  const [frizzLoading, setFrizzLoading] = useState<boolean>(false);

  useEffect(() => {
  const fetchFrizzForecast = async (temperature: number, humidity: number) => {
    try {
      setFrizzLoading(true);
      const prompt = `Given the current weather conditions with a temperature of ${temperature}°F and humidity of ${humidity}%, predict if a person's hair is likely to be frizzy. Give suggestions on hair care. Response should follow the format: "The weather is X and the humidity is Y. The likelihood of frizzy hair is Z. To prevent frizz, you should..."`;

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
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
        }),
      });

      const data = await response.json();
      const forecast = data.choices[0].message.content;
      setFrizzForecast(forecast);
      return forecast;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    } finally {
      setFrizzLoading(false);
    }
  };

  if (weatherData) {
    const temperature = kelvinToFahrenheit(weatherData.main.temp);
    const humidity = weatherData.main.humidity;
    fetchFrizzForecast(temperature, humidity);
  }
}, [weatherData]);

console.log('frizzForecast', frizzForecast);
return { frizzForecast, loading, frizzLoading};
};

export default useOpenAIHairData;
