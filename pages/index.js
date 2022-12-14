import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { db } from '../firebase';
import Feed from './components/Feed';
import Header from './components/Header';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';

export default function Home({ session, posts }) {
  if (!session) return <Login />;

  return (
    <div className="h-screen bg-gray-200 overflow-hidden">
      <Head>
        <title>Social App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Gets the user
  const session = await getSession(context);

  const postRef = collection(db, 'posts');

  const posts = query(postRef, orderBy('timestamp', 'desc'));

  const postsSnapshot = await getDocs(posts);

  let todos = [];
  postsSnapshot.forEach((doc) => {
    todos.push({
      ...doc.data(),
      id: doc.id,
      timestamp: null,
    });
  });
  // const docs = postsSnapshot?.forEach((post) => ({
  //   id: post.id,
  //   // ...post.data(),
  //   timestamp: null,
  // }));

  console.log(posts);

  return {
    props: {
      session,
      posts: todos || [],
    },
  };
}
