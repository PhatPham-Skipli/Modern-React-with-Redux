import React from 'react';
import Sidebar from '../components/comp/Sidebar';
import { Outlet } from 'react-router-dom';

const CompLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default CompLayout;