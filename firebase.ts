// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDErykYqXoXL3bKmP1koba7nWim4yt_aSY",
    authDomain: "lod-vue-assesment.firebaseapp.com",
    projectId: "lod-vue-assesment",
    storageBucket: "lod-vue-assesment.appspot.com",
    messagingSenderId: "737041017351",
    appId: "1:737041017351:web:53181095eb99d6c12818a2",
    measurementId: "G-WPNVXNWW14"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get the Auth service
const auth = getAuth(app);

export { app, auth };
