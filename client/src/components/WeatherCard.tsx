import React from "react";

interface WeatherCardProps {
  name: string;
  icon: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  name,
  icon,
  temperature,
  description,
  humidity,
  windSpeed,
}) => (
  <div className="card p-5" style={{ width: "50rem" }}>
    <div className="card-body">
      <h2 className="card-title text-uppercase text-uppercase text-center">
        Location: {name}
      </h2>
      <div className="d-flex justify-content-center">
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt="Weather Icon"
          style={{ width: "15rem", objectFit: "contain" }}
        />
      </div>
      <p className="black text-center fs-1 text-uppercase">{temperature}°</p>
      <p className="black text-center fs-3 text-uppercase">{description}</p>
      <div className="d-flex justify-content-between pt-5">
        <div className="humidity">
          <p className="black fs-3 text-uppercase">Humidity: {humidity} %</p>
        </div>
        <div className="windspeed">
          <p className="black fs-3 text-uppercase">
            Windspeed: {windSpeed} mph
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default WeatherCard;
