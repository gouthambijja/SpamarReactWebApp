import { initializeApp } from "firebase/app";
import {
  getDatabase,
  get,
  ref,
  set,
  child,
  update,
  remove,
  onValue,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBkomFp8M4EZI-jjR06EKQSEoW2g2oJ934",
  authDomain: "Spamar-71800.firebaseapp.com",
  projectId: "Spamar-71800",
  storageBucket: "Spamar-71800.appspot.com",
  messagingSenderId: "211264968903",
  appId: "1:211264968903:web:d81ba03baacd2f32e646e2",
};
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
