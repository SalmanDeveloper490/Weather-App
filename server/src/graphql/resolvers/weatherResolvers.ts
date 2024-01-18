// weatherResolvers.ts

import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

interface Weather {
  name: string;
  main: string;
  description: string;
  icon: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

interface GeoWeather {
  name: string;
  main: string;
  description: string;
  icon: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  lat: number;
  lon: number;
}

export const weatherResolvers = {
  Query: {
    searchWeather: async (_: any, { city }: { city: string }) => {
      try {
        const apiKey = process.env.WEATHER_OPEN_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl);

        const { name, weather, main, wind } = response.data;

        const weatherData: Weather = {
          name: name,
          main: weather[0].main,
          description: weather[0].description,
          icon: weather[0].icon,
          temperature: main.temp,
          humidity: main.humidity,
          windSpeed: wind.speed,
        };

        return weatherData;
      } catch (error: any) {
        console.error("Error fetching weather:", error.message);
        throw new Error("Failed to fetch weather data");
      }
    },
    getWeatherByZipcode: async (_: any, { zipcode }: { zipcode: string }) => {
      try {
        const apiKey = process.env.WEATHER_OPEN_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl);

        const { name, weather, main, wind } = response.data;

        const weatherData: Weather = {
          name: name,
          main: weather[0].main,
          description: weather[0].description,
          icon: weather[0].icon,
          temperature: main.temp,
          humidity: main.humidity,
          windSpeed: wind.speed,
        };

        return weatherData;
      } catch (error: any) {
        console.error("Error fetching weather:", error.message);
        throw new Error("Failed to fetch weather data");
      }
    },
    getWeatherByGeolocation: async (
      _: any,
      { lat, lon }: { lat: number; lon: number }
    ) => {
      try {
        console.log("Lat, Lon:", lat, lon);
        const apiKey = process.env.WEATHER_OPEN_API_KEY;
        console.log("API Key:", apiKey);

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        console.log("API URL:", apiUrl);

        const response = await axios.get(apiUrl);
        console.log("API Response:", response.data);

        const { name, coord, weather, main, wind } = response.data;

        const weatherData: GeoWeather = {
          name: name,
          main: weather[0].main,
          description: weather[0].description,
          icon: weather[0].icon,
          temperature: main.temp,
          humidity: main.humidity,
          windSpeed: wind.speed,
          lat: coord.lat,
          lon: coord.lon,
        };

        return weatherData;
      } catch (error: any) {
        console.error("Error fetching weather:", error.message);
        throw new Error("Failed to fetch weather data");
      }
    },
  },
};
