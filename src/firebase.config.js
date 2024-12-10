import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnzpt3knNsnrvI_mu6NUPaxSTsOzjeU9Q",
  authDomain: "job-app-3f564.firebaseapp.com",
  projectId: "job-app-3f564",
  storageBucket: "job-app-3f564.firebasestorage.app",
  messagingSenderId: "826047385211",
  appId: "1:826047385211:web:b83a9c1443e7b8da955cde",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
