import React from 'react';
import { getFirestore, collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Post from './Post';
import { db } from '../../firebase';

const Posts = ({ posts }) => {
  const db = getFirestore();

  const postRef = collection(db, 'posts');

  const [value, loading, error] = useCollection(
    query(postRef, orderBy('timestamp', 'desc'))
  );

  return (
    <div>
      {value
        ? value?.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              image={post.data().image}
              postImage={post.data().postImage}
              email={post.data().email}
              timestamp={post.data().timestamp}
            />
          ))
        : posts?.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              image={post.image}
              postImage={post.postImage}
              email={post.email}
              timestamp={post.timestamp}
            />
          ))}
    </div>
  );
};

export default Posts;
