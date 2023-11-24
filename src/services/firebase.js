
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAPw3dRi9VlLlJRPvZh98SNAV64ENmYZN0",
  authDomain: "importarxmlnfe-ea3da.firebaseapp.com",
  projectId: "importarxmlnfe-ea3da",
  storageBucket: "importarxmlnfe-ea3da.appspot.com",
  messagingSenderId: "1045629072274",
  appId: "1:1045629072274:web:f7d01494acc818f4eec74b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)