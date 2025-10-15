import React from 'react';

const ProfileCard = ({ title, handle, image, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
      <img
        src={image}
        alt={title}
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-200"
      />
      <h2 className="text-xl font-bold text-blue-700">{title}</h2>
      <p className="text-blue-500 mb-2">{handle}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ProfileCard;