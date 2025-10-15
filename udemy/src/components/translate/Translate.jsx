import React, { useEffect, useState } from "react";

function Translate({ language, text }) {
  const [translated, setTranslated] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!text) {
      setTranslated("");
      setError("");
      return;
    }

    const id = setTimeout(async () => {
      setError("");
      try {
        const res = await fetch("https://libretranslate.de/translate", {
          method: "POST",
          body: JSON.stringify({
            q: text,
            source: "en",
            target: language,
            format: "text"
          }),
          headers: { "Content-Type": "application/json" }
        });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setTranslated(data.translatedText || "");
        if (!data.translatedText) setError("Không thể dịch. Vui lòng thử lại hoặc đổi ngôn ngữ.");
      } catch {
        setTranslated("");
        setError("Không thể dịch. Vui lòng thử lại hoặc đổi ngôn ngữ.");
      }
    }, 300);

    return () => clearTimeout(id);
  }, [text, language]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <label className="block text-gray-700 font-semibold mb-2">Output</label>
      <h1 className="text-2xl font-bold text-indigo-600 min-h-[32px]">
        {translated}
      </h1>
      {error && (
        <div className="text-red-500 mt-2 text-sm">{error}</div>
      )}
    </div>
  );
}

export default Translate;