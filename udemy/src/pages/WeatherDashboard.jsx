import React, { useState } from "react";
import CityForm from "../components/weather/CityForm";
import WeatherInfo from "../components/weather/WeatherInfo";

const API_KEY = "ab0320b3d3e9123c2ee4d986e638a6d0";

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=vi`
      );
      if (!res.ok) throw new Error("Không tìm thấy thành phố!");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg border border-blue-100">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Weather Dashboard</h1>
      <CityForm onSearch={fetchWeather} />
      {loading && <div className="text-blue-500 mb-4">Đang tải...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <WeatherInfo weather={weather} />
    </div>
  );
};

export default WeatherDashboard;