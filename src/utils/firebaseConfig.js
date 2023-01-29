import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAGmuqgqdMfENp_-icBY4nxcUakQYlBNc",
  authDomain: "chat-app-b76de.firebaseapp.com",
  projectId: "chat-app-b76de",
  storageBucket: "chat-app-b76de.appspot.com",
  messagingSenderId: "505067849560",
  appId: "1:505067849560:web:f72953042ae46f2fd3c72d",
  measurementId: "G-J48884SNGY",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
