import React, { useState } from 'react';
import heart from '../../svg/heart.svg';
import bird from '../../svg/bird.svg';
import cat from '../../svg/cat.svg';
import cow from '../../svg/cow.svg';
import gator from '../../svg/gator.svg';
import horse from '../../svg/horse.svg';
import dog from '../../svg/dog.svg';

const svgMap = {
  bird,
  cat,
  cow,
  gator,
  horse,
  dog
};

const AnimalShow = ({ animal }) => {
  const [clicks, setClicks] = useState(0);
  const handleClick = () => {
    if ((10 + 10 * clicks) < 200) {
      setClicks(clicks + 1);
    }
  };

  return (
    <div
      className="relative border border-gray-200 p-4 rounded-lg m-2 shadow-md bg-white cursor-pointer hover:shadow-lg transition"
    >
      <img
        className="h-48 mx-auto"
        src={svgMap[animal]}
        alt={animal}
      />
      <img
        onClick={handleClick}
        src={heart}
        alt="heart"
        style={{ width: `${10 + 10 * clicks}px` }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-200"
      />
    </div>
  );
};

export default AnimalShow;