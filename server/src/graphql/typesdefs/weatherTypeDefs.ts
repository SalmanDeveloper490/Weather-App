import { gql } from "graphql-tag";

export const weatherTypeDefs = gql`
  type Weather {
    name: String
    main: String
    description: String
    icon: String
    temperature: Float
    humidity: Int
    windSpeed: Float
    lat: Float
    lon: Float
  }

  type Query {
    searchWeather(city: String!): Weather
    getWeatherByZipcode(zipcode: String!): Weather
    getWeatherByGeolocation(lat: Float!, lon: Float!): Weather
  }
`;
