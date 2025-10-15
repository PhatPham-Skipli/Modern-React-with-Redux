import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-xl py-5 px-10 flex items-center justify-between rounded-b-3xl border-b-4 border-blue-500">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-blue-700 text-2xl font-extrabold tracking-widest">Udemy React</Link>
      </div>
      <nav className="flex gap-10">
        <Link to="/" className="text-blue-600 text-lg font-semibold hover:underline underline-offset-4 transition">Home</Link>
        <Link to="/courses" className="text-blue-600 text-lg font-semibold hover:underline underline-offset-4 transition">Courses</Link>
        <Link to="/about" className="text-blue-600 text-lg font-semibold hover:underline underline-offset-4 transition">About</Link>
        <Link to="/contact" className="text-blue-600 text-lg font-semibold hover:underline underline-offset-4 transition">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;