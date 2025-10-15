import React from 'react';
import Sidebar from '../../components/Sidebar';

const CompPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800">CompPage</h1>
        <p className="mt-4 text-gray-600">
          This is the content of the CompPage. You can add more components or content here.
        </p>
      </div>
    </div>
  );
};

export default CompPage;