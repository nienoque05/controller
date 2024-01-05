import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCxaJe9UWctd_hLCGjPwZmCnIGKyrMWZpU",
  authDomain: "estoques-a47bd.firebaseapp.com",
  projectId: "estoques-a47bd",
  storageBucket: "estoques-a47bd.appspot.com",
  messagingSenderId: "889369082380",
  appId: "1:889369082380:web:52439a08980fb500944c29",
  measurementId: "G-0YRVVXW2MB"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db};