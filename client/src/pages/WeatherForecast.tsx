import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import { SEARCH_WEATHER } from "../graphql/queries/WeatherQueries";
import Loader from "../components/Loader";
import WeatherCard from "../components/WeatherCard";

interface WeatherData {
  searchWeather?: {
    name: string;
    main: string;
    icon: string;
    description: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
  };
}

const WeatherForecast: React.FC = () => {
  const { cityName } = useParams<{
    cityName?: string;
  }>();

  const { loading, error, data } = useQuery<WeatherData>(SEARCH_WEATHER, {
    variables: { city: cityName },
  });

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const weatherData = data?.searchWeather;

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

export default WeatherForecast;
