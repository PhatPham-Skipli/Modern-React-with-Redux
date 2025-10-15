import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { label: 'Accordion', path: '/comp/accordion' },
    { label: 'Dropdown', path: '/comp/dropdown' },
    { label: 'Modal', path: '/comp/modal' },
    { label: 'Table', path: '/comp/table' },
  ];

  const renderedLinks = links.map((link) => (
    <NavLink
      key={link.path}
      to={link.path}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition ${
          isActive ? 'bg-blue-500 text-white' : ''
        }`
      }
    >
      {link.label}
    </NavLink>
  ));

  return (
    <div className="w-64 h-screen bg-gray-50 shadow-lg p-4">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Sidebar</h2>
      <nav className="space-y-2">{renderedLinks}</nav>
    </div>
  );
};

export default Sidebar;