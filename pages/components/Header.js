import Image from 'next/image';
import React from 'react';
// import {
//   BellIcon,
//   ChatIcon,
//   ChevronDownIcon,
//   HomeIcon,
//   UserGroupIcon,
//   ViewGridIcon,
// } from '@heroicons/react/24/solid';

// import {
//   FlagIcon,
//   PlayIcon,
//   SearchIcon,
//   ShoppingCartIcon,
// } from '@heroicons/react/24/outline';
import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  ChevronDownIcon,
  FlagIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import HeaderIcon from './HeaderIcon';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
          alt=""
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2 ">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
          <input
            className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      <div className="flex justify-center flex-grow">
        <div className="flex items-center space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      <div className="flex items-center justify-end sm:space-x-2">
        <Image
          className="rounded-full cursor-pointer"
          alt=""
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <p className="whitespace-nowrap pr-3 font-semibold">
          {session.user.name}
        </p>
        <Squares2X2Icon className="icon" />
        <ChatBubbleBottomCenterIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
