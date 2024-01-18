import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_WEATHER_BY_GEOLOCATION } from "../graphql/queries/WeatherQueries";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import WeatherCard from "../components/WeatherCard";

interface WeatherData {
  getWeatherByGeolocation?: {
    name: string;
    main: string;
    icon: string;
    description: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
  };
}

const GeoLocationForecast = () => {
  const { lat, lon } = useParams<{
    lat?: string;
    lon?: string;
  }>();

  const { loading, error, data } = useQuery<WeatherData>(
    GET_WEATHER_BY_GEOLOCATION,
    {
      variables: { lat: parseFloat(lat!), lon: parseFloat(lon!) },
    }
  );

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const weatherData = data?.getWeatherByGeolocation;

  console.log("weatherData", weatherData);
  return (
    <Layout>
      <div className="container py-5 d-flex justify-content-center">
        <div className="row my-5">
          <WeatherCard
            name={weatherData?.name || ""}
            icon={weatherData?.icon || ""}
            temperature={weatherData?.temperature || 0}
            description={weatherData?.description || ""}
            humidity={weatherData?.humidity || 0}
            windSpeed={weatherData?.windSpeed || 0}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GeoLocationForecast;
