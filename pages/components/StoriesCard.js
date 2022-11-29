import Image from 'next/image';
import React from 'react';

const StoriesCard = ({ name, bgImage, profileImage }) => {
  return (
    <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-hidden rounded-3xl p-3 ">
      <Image
        className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-5 left-1"
        src={profileImage}
        alt=""
        width={40}
        height={40}
        layout="fixed"
        objectFit="cover"
      />
      <Image
        className="object-cover filter brightness-75 rounded-full lg:rounded-3xl lg:hover:scale-105 transition-all"
        src={bgImage}
        alt=""
        layout="fill"
      />
    </div>
  );
};

export default StoriesCard;
