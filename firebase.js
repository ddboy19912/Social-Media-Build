import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAz1Yp7hjmJkoLavhWYgzLYwtqeSjx4jLk',
  authDomain: 'socialmedia-clone-bacb9.firebaseapp.com',
  projectId: 'socialmedia-clone-bacb9',
  storageBucket: 'socialmedia-clone-bacb9.appspot.com',
  messagingSenderId: '379295000627',
  appId: '1:379295000627:web:3489b8f71c788f22859b46',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
