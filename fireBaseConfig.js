// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAR-R_MzSEE0O4r6Z2PSk7AFMX7NBliqrs",
    authDomain: "tinderclone-385307.firebaseapp.com",
    projectId: "tinderclone-385307",
    storageBucket: "tinderclone-385307.appspot.com",
    messagingSenderId: "24482868891",
    appId: "1:24482868891:web:a9438a7b1414ec5be5a03e",
    measurementId: "G-D5RNQ1M970"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database=getFirestore(app);
export const auth=getAuth();
export const store=getStorage(app);