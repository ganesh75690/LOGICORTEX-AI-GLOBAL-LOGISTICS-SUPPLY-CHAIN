// Firebase Web Configuration Example for Smart Supply Chain Platform
// Copy this file to firebase-config.js and replace with your actual Firebase configuration

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Export for use in React components
export default firebaseConfig;

// Example usage in React:
// import firebaseConfig from './firebase-config';
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
// import { getFirestore } from 'firebase/firestore';
//
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const database = getDatabase(app);
// const firestore = getFirestore(app);
