import React from "react";

const WeatherInfo = ({ weather }) => {
  if (!weather) return null;
  return (
    <div className="bg-blue-50 rounded-xl p-6 shadow text-blue-900">
      <h2 className="text-2xl font-bold mb-2">{weather.name}, {weather.sys.country}</h2>
      <div className="flex items-center gap-4 mb-2">
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
        <span className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</span>
      </div>
      <div className="mb-1">{weather.weather[0].description}</div>
      <div>Độ ẩm: {weather.main.humidity}%</div>
      <div>Gió: {weather.wind.speed} m/s</div>
    </div>
  );
};

export default WeatherInfo;