import React from 'react';
import ProfileCard from '../components/profileCard/ProfileCard';

const profiles = [
  {
    title: "John Smith",
    handle: "@johnsmith",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Cortana",
    handle: "@cortana",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Siri",
    handle: "@siri",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

const ProfileCardPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">Profile Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {profiles.map(profile => (
          <ProfileCard key={profile.handle} {...profile} />
        ))}
      </div>
    </div>
  );
};

export default ProfileCardPage;