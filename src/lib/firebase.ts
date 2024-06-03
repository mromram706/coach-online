import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBe4qb3HJXC_uEdoh_84vEd126tih5WFM",
  authDomain: "coachonline.firebaseapp.com",
  projectId: "coachonline",
  storageBucket: "coachonline.appspot.com",
  messagingSenderId: "25896150652",
  appId: "1:25896150652:web:fc885cd9483c863d638bf9",
  measurementId: "G-5S6VLLDGKD",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Solo inicializar Firebase Analytics en el lado del cliente
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Configurar la persistencia de la autenticación
auth.setPersistence(browserLocalPersistence);

// Crear proveedores de autenticación
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const emailProvider = new EmailAuthProvider();
