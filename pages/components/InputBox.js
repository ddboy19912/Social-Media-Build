import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { db, storage } from '../../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  orderBy,
} from 'firebase/firestore';
import {
  ref,
  uploadString,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from 'firebase/storage';

const InputBox = () => {
  const { data: session, status } = useSession();

  const inputRef = useRef(null);
  const imageRef = useRef(null);

  const [imageToPost, setImageToPost] = useState(null);
  const [percent, setPercent] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: serverTimestamp(),
      }).then((docum) => {
        console.log('Document written with ID: ', docum.id);
        if (imageToPost) {
          const storage = getStorage();
          const storageRef = ref(storage, `posts/${docum.id}`);
          //   const uploadTask = uploadString(storageRef, imageToPost, 'data_url');

          //   uploadTask.on(
          //     'state_change',
          //     (snapshot) => {
          //       const percent = Math.round(
          //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          //       );

          //       // update progress
          //       setPercent(percent);
          //     },
          //     (error) => alert('Something went wrong'),
          //     () => {
          //       // download url
          //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //         setDoc(
          //           doc(db, 'posts', docum.id),
          //           {
          //             postImage: url,
          //           },
          //           { merge: true }
          //         );
          //       });
          //     }
          //   );
          //   removeImage();
          // }
          uploadString(storageRef, imageToPost, 'data_url').then((snapshot) => {
            getDownloadURL(snapshot.ref).then((URL) => {
              setDoc(
                doc(db, 'posts', docum.id),
                { postImage: URL },
                { merge: true }
              );
              console.log('File available at ', URL);
            });
            removeImage();
          });
        }
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    inputRef.current.value = '';
  };

  const uploadImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          alt=""
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind,  ${session.user.name} ?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img src={imageToPost} className="h-10 object-contain" alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-between p-3">
        <div className="inputIcon">
          <VideoCameraIcon className="text-red-500 h-7 " />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div className="inputIcon" onClick={() => imageRef.current.click()}>
          <CameraIcon className="text-green-500 h-7 cursor-pointer" />
          <p className="text-xs sm:text-sm xl:text-base cursor-pointer">
            Photo/Video
          </p>
          <input
            type="file"
            hidden
            onChange={uploadImage}
            ref={imageRef}
            accept="image/*"
          />
        </div>
        <div className="inputIcon">
          <FaceSmileIcon className="text-yellow-300 h-7 cursor-pointer" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
