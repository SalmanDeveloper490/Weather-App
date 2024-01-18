import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import {
  GET_WEATHER_BY_GEOLOCATION,
  GET_WEATHER_BY_ZIPCODE,
  SEARCH_WEATHER,
} from "../graphql/queries/WeatherQueries";
import { toast } from "react-toastify";
import { useGeolocation } from "../contextapi/GeolocationContext";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState<string>("");
  const [zipCode, setZipcode] = useState<string>("");
  const [showZipcodeInput, setShowZipcodeInput] = useState<boolean>(false);
  const [showCityNameInput, setShowCityNameInput] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string>("cityname");

  const { lat, lon, updateGeolocationData } = useGeolocation();

  console.log("lat", lat);
  console.log("lon", lon);

  const [getWeather, { data, error }] = useLazyQuery(SEARCH_WEATHER, {
    variables: { city: cityName },
  });

  const [getWeatherByZipcode, { data: zipCodeData, error: zipCodeError }] =
    useLazyQuery(GET_WEATHER_BY_ZIPCODE, {
      variables: { zipcode: zipCode },
    });

  const [getWeatherByGeolocationQuery, { data: geoData, error: geoError }] =
    useLazyQuery(GET_WEATHER_BY_GEOLOCATION);

  console.log("geoData", geoData);

  // CITY NAME SEARCH
  const handleSearchCityName = () => {
    if (cityName.trim() !== "") {
      getWeather({ variables: { city: cityName } });
    } else {
      toast.warn("OOPS! Please Fill Search Field", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (data && data.searchWeather) {
      navigate(`/forecast/${cityName}`);
    } else if (error) {
      console.error("Error fetching weather data:", error.message);
      navigate("/error");
    }
  }, [data, error, cityName, navigate]);

  // ZIPCODE SEARCH
  const handleSearchZipcode = () => {
    if (zipCode.trim() !== "") {
      getWeatherByZipcode({ variables: { zipcode: zipCode } });
    } else {
      toast.warn("OOPS! Please Fill Search Field", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (zipCodeData && zipCodeData.getWeatherByZipcode) {
      navigate(`/forecast/${zipCode}`);
    } else if (zipCodeError) {
      // <-- Corrected variable name
      console.error("Error fetching weather data:", zipCodeError.message);
      navigate("/error");
    }
  }, [zipCodeData, zipCodeError, zipCode, navigate]);

  const handleGeolocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Update the geolocation context with the new values
            updateGeolocationData(latitude, longitude);

            // Use the values directly without declaring new variables
            await getWeatherByGeolocationQuery({
              variables: { lat: latitude, lon: longitude },
            });
          } catch (error: any) {
            console.error("Geolocation error:", error.message);
          }
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (geoData && geoData.getWeatherByGeolocation) {
      const { lat, lon } = geoData.getWeatherByGeolocation;
      console.log("Lat and Lon from geoData:", lat, lon);
      navigate(`/forecast/${lat}/${lon}`);
    } else if (geoError) {
      console.error("Error fetching weather data:", geoError.message);
      navigate("/error");
    }
  }, [geoData, geoError, navigate]);

  const handleRadioChange = (option: string) => {
    setSelectedOption(option);
    if (option === "zipcode") {
      setShowZipcodeInput(true);
      setShowCityNameInput(false);
    } else if (option === "cityname") {
      setShowCityNameInput(true);
      setShowZipcodeInput(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row py-5">
          <div className="col-md-12">
            <h1 className="text-uppercase text-center">Weather Forecast</h1>
            <p className="text-center pt-3 pb-5 px-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestias, dolor asperiores nihil officia quidem accusantium velit
              deserunt quisquam dicta, ratione reiciendis eveniet laborum iusto
              ipsa porro aperiam? Earum, laboriosam corrupti. Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Molestias, dolor asperiores
              nihil officia quidem accusantium velit deserunt quisquam dicta,
              ratione reiciendis eveniet laborum iusto ipsa porro aperiam?
              Earum, laboriosam corrupti.
            </p>
          </div>
        </div>
        <div className="row mt-3">
          <div>
            <div className="form-check form-check-inline" id="formCheck">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio1"
                value="zipcode"
                checked={selectedOption === "zipcode"}
                onChange={() => handleRadioChange("zipcode")}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                City Zipcode
              </label>
            </div>
            {showZipcodeInput && (
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Search By Zipcode"
                  aria-label="Search By Zipcode"
                  aria-describedby="button-addon2"
                  value={zipCode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
                <button
                  className="btn btn-outline-light p-4"
                  type="button"
                  id="button-addon2"
                  onClick={handleSearchZipcode}
                >
                  Enter
                </button>
                <button
                  className="btn btn-outline-light p-4"
                  type="button"
                  id="button-addon2"
                  onClick={handleGeolocation}
                >
                  Use My Location
                </button>
              </div>
            )}
            <div className="form-check form-check-inline" id="formCheck">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio2"
                value="cityname"
                checked={selectedOption === "cityname"}
                onChange={() => handleRadioChange("cityname")}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                City Name
              </label>
            </div>
            {showCityNameInput && (
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Search By City Name"
                  aria-label="Search By City Name"
                  aria-describedby="button-addon2"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                />
                <button
                  className="btn btn-outline-light p-4"
                  type="button"
                  id="button-addon2"
                  onClick={handleSearchCityName}
                >
                  Enter
                </button>
                <button
                  className="btn btn-outline-light p-4"
                  type="button"
                  id="button-addon2"
                  onClick={handleGeolocation}
                >
                  Use My Location
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
