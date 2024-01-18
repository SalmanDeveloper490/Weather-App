import { gql } from "@apollo/client";

export const SEARCH_WEATHER = gql`
  query searchWeatherQuery($city: String!) {
    searchWeather(city: $city) {
      name
      main
      icon
      description
      temperature
      humidity
      windSpeed
    }
  }
`;

export const GET_WEATHER_BY_GEOLOCATION = gql`
  query getWeatherByGeolocationQuery($lat: Float!, $lon: Float!) {
    getWeatherByGeolocation(lat: $lat, lon: $lon) {
      name
      main
      icon
      description
      temperature
      humidity
      windSpeed
      lat
      lon
    }
  }
`;

export const GET_WEATHER_BY_ZIPCODE = gql`
  query getWeatherByZipcodeQuery($zipcode: String!) {
    getWeatherByZipcode(zipcode: $zipcode) {
      name
      main
      icon
      description
      temperature
      humidity
      windSpeed
    }
  }
`;
