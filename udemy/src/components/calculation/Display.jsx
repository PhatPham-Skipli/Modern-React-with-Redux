import React from "react";

const Display = ({ value }) => (
  <div className="px-4 py-5 text-3xl bg-blue-50 mb-3 rounded-xl shadow text-right font-bold text-blue-900 min-h-[56px] tracking-wider">
    {value}
  </div>
);

export default Display;