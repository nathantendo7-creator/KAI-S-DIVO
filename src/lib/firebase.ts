import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Helper to check if Firebase is configured
export const isFirebaseConfigured = () => {
  return !!import.meta.env.VITE_FIREBASE_API_KEY && !!import.meta.env.VITE_FIREBASE_PROJECT_ID;
};

// Initialize Firebase only if configured, otherwise provide a dummy db or handle gracefully
let db: any = null;

if (isFirebaseConfigured()) {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getDatabase(app);
}

export { db };
