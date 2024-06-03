import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { logEvent } from "firebase/analytics";
import { analytics, db, auth, googleProvider } from "./firebase";
import { getUserData, saveUserProfile } from "./firestore";
import { useStore } from "../store/store";
import { User } from "../types/user";
import { doc, getDoc } from "@firebase/firestore";

const retryGetUserData = async (
  userId: string,
  retries: number = 3,
  delayMs: number = 1000,
): Promise<User | null> => {
  for (let i = 0; i < retries; i++) {
    const user = await getUserData(userId);
    if (user) return user;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return null;
};

export const initializeAuth = () => {
  useStore.getState().setLoading(true);
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const appUser = await retryGetUserData(firebaseUser.uid);
      if (appUser) {
        useStore.getState().setUser(appUser);
      } else {
        console.error("No such user!");
      }
    } else {
      useStore.getState().setUser(null);
    }
    useStore.getState().setLoading(false);
  });
};

export async function signOut() {
  try {
    await auth.signOut();
    useStore.getState().setUser(null);
    if (analytics !== null) {
      logEvent(analytics, "logout");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function signIn(email: string, password: string, handleClose: () => void) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (analytics !== null) {
      logEvent(analytics, "login_click");
    }
    useStore.getState().setLoading(true);
    const appUser = await retryGetUserData(result.user.uid);
    useStore.getState().setUser(appUser);
    handleClose();
    useStore.getState().setLoading(false);
    return result.user;
  } catch (error) {
    useStore.getState().setLoading(false);
    console.error(error);
    throw error;
  }
}

export async function signInWithGoogle(handleClose: () => void) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    googleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    const result = await signInWithPopup(auth, googleProvider);

    if (result.user.uid !== null) {
      const userRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(userRef);

      let existingPhotoURL = "";

      if (docSnap.exists()) {
        const existingData = docSnap.data();
        existingPhotoURL = existingData.photoURL || "";
      }

      const { displayName, email, photoURL } = result.user;
      const user: User = {
        userId: result.user.uid,
        name: displayName || "",
        email: email || "",
        photoURL: existingPhotoURL || (photoURL ?? ""),
      };

      await saveUserProfile(user);
      const appUser = await retryGetUserData(result.user.uid);
      useStore.getState().setUser(appUser); // Actualizar el estado del usuario inmediatamente
    } else {
      throw new Error("El UID del usuario es nulo");
    }

    if (analytics !== null) {
      logEvent(analytics, "login");
    }

    handleClose();
    return result.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function registerForm(
  data: { email: string; password: string; name: string },
  handleClose: () => void,
) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
    if (result.user.uid !== null) {
      const user: User = {
        userId: result.user.uid,
        name: data.name,
        email: data.email,
        photoURL: "",
      };
      await saveUserProfile(user);
      const appUser = await retryGetUserData(result.user.uid);
      useStore.getState().setUser(appUser);
    } else {
      throw new Error("El UID del usuario es nulo");
    }
    if (analytics !== null) {
      logEvent(analytics, "register");
    }
    handleClose();
    return result.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
