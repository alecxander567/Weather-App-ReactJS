import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import sun from './assets/sun.gif';
import rain from './assets/rain.gif';
import cloud from './assets/cloudy.gif';
import snow from './assets/snow.gif';

import React, { useEffect, useState } from "react";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Manila");
  const [error, setError] = useState(null);

  const apiKey = "98d2a976bd6d847c03c9a9e64c271a8c";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError(null);
      } else {
        setError("City not found.");
        setWeatherData(null);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return sun;
      case "Rain":
        return rain;
      case "Clouds":
        return cloud;
      case "Snow":
        return snow;
      default:
        return cloud; 
    }
  };

  return (
    <div
      className="mt-5 p-4 rounded mx-auto"
      style={{
        backgroundColor: "rgba(211, 211, 211, 0.3)",
        width: "100%",
        maxWidth: "500px",
        height: "500px",
      }}
    >
      <h2 className="text-white mb-4">
        Weather App
        <i className="bi bi-cloud-sun-fill me-2"></i>
      </h2>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control text-white"
          placeholder="Search city..."
          aria-label="Search city"
          aria-describedby="button-search"
          style={{
            backgroundColor: "transparent",
            border: "1px solid white",
          }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button
          className="btn btn-light"
          type="button"
          id="button-search"
          onClick={fetchWeather}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>

      <div className="text-center mt-3">
        {error ? (
          <p className="text-danger">{error}</p>
        ) : weatherData ? (
          <>
            <img
              src={getWeatherIcon(weatherData.weather[0].main)}
              alt={weatherData.weather[0].main}
              className="img-fluid rounded"
              style={{ width: "150px", height: "150px" }}
            />
            <h4 className="text-white">{weatherData.weather[0].main}</h4>
          </>
        ) : (
          <p className="text-white">Enter a city to get weather info</p>
        )}
      </div>

      {weatherData && (
        <div
          className="d-flex justify-content-between align-items-center text-white px-5 py-3"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            marginTop: "50px",
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-droplet-fill" style={{ fontSize: "1.5rem" }}></i>
            <span>{weatherData.main.humidity}% Humidity</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-wind" style={{ fontSize: "1.5rem" }}></i>
            <span>{weatherData.wind.speed} km/h</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-geo-alt-fill" style={{ fontSize: "1.5rem" }}></i>
            <span>{weatherData.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
