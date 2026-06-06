import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDkBQPX8QVGEXc4NyN2Q0SZErjiVnMZtqc",
  authDomain: "resume-analyzer-suresh.firebaseapp.com",
  projectId: "resume-analyzer-suresh",
  storageBucket: "resume-analyzer-suresh.firebasestorage.app",
  messagingSenderId: "228662860741",
  appId: "1:228662860741:web:7615e8b70df1c8f74089ac"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
