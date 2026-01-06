import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBHhI19bxb-lLmdVc4Yj9u_t5zX1WLVPOA", 
  authDomain: "nativereact-85a69.firebaseapp.com",
  projectId: "nativereact-85a69",
  storageBucket: "nativereact-85a69.appspot.com",
  messagingSenderId: "329129240638",
  appId: "1:329129240638:android:2b02a34cd9f2f31638896f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
