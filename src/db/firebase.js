import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTdNytxuHP372xT_qT4AynntfvLfRtP1M",
  authDomain: "phyosweet-dhamma-app.firebaseapp.com",
  projectId: "phyosweet-dhamma-app",
  storageBucket: "phyosweet-dhamma-app.appspot.com",
  messagingSenderId: "755637540882",
  appId: "1:755637540882:web:916d69c398c5ca1b40e0cb",
  measurementId: "G-TXV3JGDEGE"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseapp);
// const analytics = getAnalytics(firebaseapp);

export default firebaseapp;


export { firestore }