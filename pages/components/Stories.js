import React from 'react';
import StoriesCard from './StoriesCard';

const stories = [
  {
    name: 'Bill Gates',
    src: 'https://links.papareact.com/4u4',
    profile: 'https://links.papareact.com/zvy',
  },
  {
    name: 'Jeff Bezos',
    src: 'https://links.papareact.com/k2j',
    profile: 'https://links.papareact.com/f0p',
  },
  {
    name: 'Mark Zuckerberg',
    src: 'https://links.papareact.com/xql',
    profile: 'https://links.papareact.com/snf',
  },
  {
    name: 'Bill Gates II',
    src: 'https://links.papareact.com/4u4',
    profile: 'https://links.papareact.com/zvy',
  },
];

const Stories = () => {
  return (
    <div className="flex mx-auto justify-between px-7 space-x-3 bg-white py-10 rounded-2xl shadow-md">
      {stories.map((story) => (
        <StoriesCard
          name={story.name}
          bgImage={story.src}
          profileImage={story.profile}
          key={story.name}
        />
      ))}
    </div>
  );
};

export default Stories;
