import React, { useState } from "react";
import Display from "../components/calculation/Display";
import Keypad from "../components/calculation/Keypad";

const CalculationPage = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        // eslint-disable-next-line no-eval
        setResult(eval(input).toString());
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
      setResult("");
    } else if (value === "%") {
      try {
        setResult((eval(input) / 100).toString());
      } catch {
        setResult("Error");
      }
    } else {
      setInput((prev) => prev + value);
      setResult("");
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg border border-blue-100">
      <Display value={result || input || "0"} />
      <Keypad onClick={handleClick} />
    </div>
  );
};

export default CalculationPage;