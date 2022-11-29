import Image from 'next/image';
import React from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div className="grid place-items-center">
      <Image
        src="https://links.papareact.com/5me"
        width={409}
        height={400}
        objectFit="contain"
        alt=""
      />
      <h1
        onClick={signIn}
        className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer mt-16"
      >
        Login with Facebook
      </h1>
    </div>
  );
};

export default Login;
