import React from 'react';
import { Link } from 'react-router-dom';

const miniProjects = [
  { name: "Image Project", path: "/image" },
  { name: "ProfileCard Project", path: "/profile-card" },
  { name: "Animal Project", path: "/animal" },
  { name: "Book Project", path: "/book" },
  { name: "Comp Project", path: "/comp/accordion" },
  { name: "Counter Project", path: "/counter" },
  { name: "Map Project", path: "/map" },
  { name: "Registry Project", path: "/registry" },
  { name: "Translate Project", path: "/translate" },
  { name: "Calculation Project", path: "/calculation" },
  { name: "Weather Project", path: "/weather" },
  { name: "Video Project", path: "/video" },
];

const HomePage = () => {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">Mini Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {miniProjects.map((project) => (
          <Link
            key={project.path}
            to={project.path}
            className="flex items-center gap-4 p-5 bg-blue-50 rounded-xl shadow hover:bg-blue-100 transition group"
          >
            <span className="text-xl font-semibold text-blue-700">{project.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;