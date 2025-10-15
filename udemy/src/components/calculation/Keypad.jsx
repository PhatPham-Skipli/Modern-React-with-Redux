import React from "react";

const buttons = [
  "C", "⌫", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "=", 
];

const colors = {
  "/": "bg-blue-400 text-white",
  "*": "bg-blue-400 text-white",
  "-": "bg-blue-400 text-white",
  "+": "bg-blue-400 text-white",
  "=": "bg-orange-400 text-white",
  "C": "bg-red-400 text-white",
  "⌫": "bg-yellow-400 text-white",
  "%": "bg-blue-300 text-white"
};

const Keypad = ({ onClick }) => (
  <div className="grid grid-cols-4 gap-3">
    {buttons.map((btn) => (
      <button
        key={btn}
        className={`text-2xl py-4 rounded-lg font-bold shadow hover:bg-blue-100 transition ${colors[btn] || "bg-blue-100 text-blue-900"}`}
        onClick={() => onClick(btn)}
      >
        {btn}
      </button>
    ))}
  </div>
);

export default Keypad;