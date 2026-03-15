import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA8zjuZMJGohwuT4U8c4xKTtZjarqIIf0w",
  authDomain: "task-management-dashboar-c9983.firebaseapp.com",
  projectId: "task-management-dashboar-c9983",
  storageBucket: "task-management-dashboar-c9983.firebasestorage.app",
  messagingSenderId: "187130481030",
  appId: "1:187130481030:web:675c92c1c4b0cd22d84407"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()