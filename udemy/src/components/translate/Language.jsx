import React from "react";

function Language({ language, onLanguageChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <label className="block text-gray-700 font-semibold mb-3">Select Language</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {LANGUAGES.map(({ label, value }) => {
          return (
            <div
              key={label}
              className={`px-4 py-2 rounded-lg cursor-pointer text-center transition ${
                language === value
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() => onLanguageChange(value)}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const LANGUAGES = [
  { label: "Afrikaans", value: "af" },
  { label: "Arabic", value: "ar" },
  { label: "French", value: "fr" },
  { label: "Hindi", value: "hi" },
  { label: "Japanese", value: "ja" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Chinese", value: "zh" },
  { label: "Spanish", value: "es" },
  { label: "Swahili", value: "sw" },
  { label: "Thai", value: "th" }
];

export default Language;