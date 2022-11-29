import React from 'react';

const HeaderIcon = ({ Icon, active }) => {
  return (
    <div className="cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-200 rounded-xl flex items-center active:border-b-4 active:border-blue-500 group">
      <Icon
        className={`h-5  text-center sm:h-7 mx-auto group-hover:text-blue-500 ${
          active ? 'text-blue-500' : 'text-gray-500'
        }`}
      />
    </div>
  );
};

export default HeaderIcon;
