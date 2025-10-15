import React from "react";

function Field({ value, onChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">Translate App</h1>
      <label className="block text-gray-700 font-semibold mb-2">Enter English</label>
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
}

export default Field;