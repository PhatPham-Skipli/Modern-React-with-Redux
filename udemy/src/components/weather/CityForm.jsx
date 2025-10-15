import React, { useState } from "react";

const CityForm = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <form className="flex gap-2 mb-6" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border rounded-lg px-4 py-2 flex-1"
        placeholder="Nhập tên thành phố..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold" type="submit">
        Tìm
      </button>
    </form>
  );
};

export default CityForm;