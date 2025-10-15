import React, { useState } from 'react';

const CounterPage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Counter: {count}</h1>
      <div className="space-x-4 mb-6">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Increment
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Decrement
        </button>
      </div>
      <form className="flex flex-col items-center">
        <label htmlFor="count" className="text-lg font-medium text-gray-700 mb-2">
          Set Count:
        </label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
};

export default CounterPage;