import { doc, getDoc, setDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { User } from "../types/user";
import { Subscription } from "../types/subscription";
import { PhysicalData } from "../types/physicalData";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { AddressFormData } from "../types/formData";

// Obtener datos del usuario
export async function getUserData(userId: string): Promise<User | null> {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data() as User;
    let userSubscription: Subscription | null = null;
    let userPhysicalData: PhysicalData | null = null;

    if (userData.subscriptionId) {
      const subscriptionDocRef = doc(db, "subscriptions", userData.subscriptionId);
      const subscriptionDocSnap = await getDoc(subscriptionDocRef);
      if (subscriptionDocSnap.exists()) {
        userSubscription = subscriptionDocSnap.data() as Subscription;
      }
    }

    if (userData.physicalDataId) {
      const physicalDataDocRef = doc(db, "physicalData", userData.physicalDataId);
      const physicalDataDocSnap = await getDoc(physicalDataDocRef);
      if (physicalDataDocSnap.exists()) {
        userPhysicalData = physicalDataDocSnap.data() as PhysicalData;
      }
    }

    return {
      ...userData,
      userId: userId,
      subscription: userSubscription,
      physicalData: userPhysicalData,
    };
  } else {
    return null;
  }
}

// Guardar perfil del usuario
export async function saveUserProfile(user: User) {
  try {
    const userRef = doc(db, "users", user.userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const existingData = docSnap.data();
      await setDoc(userRef, {
        ...existingData,
        ...user,
        photoURL: user.photoURL || existingData.photoURL,
      });
    } else {
      await setDoc(userRef, user);
    }
  } catch (error) {
    console.error("Error saving user profile: ", error);
  }
}
// Actualizar nombre del usuario
export async function updateUser(userId: string, name: string) {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      name: name,
    });
  } catch (error) {
    console.error("Error updating user: ", error);
  }
}

// Obtener dirección del usuario
export async function getUserAddress(userId: string): Promise<AddressFormData | null> {
  const docRef = doc(db, "addresses", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as AddressFormData;
  } else {
    return null;
  }
}

// Guardar dirección del usuario
export async function saveUserAddress(userId: string, address: AddressFormData) {
  try {
    await setDoc(doc(db, "addresses", userId), { ...address });
  } catch (error) {
    console.error("Error saving user address: ", error);
  }
}

// Actualizar dirección del usuario
export async function updateUserAddress(userId: string, address: AddressFormData) {
  const addressRef = doc(db, "addresses", userId);

  try {
    await updateDoc(addressRef, { ...address });
  } catch (error) {
    console.error("Error updating user address: ", error);
  }
}

// Actualizar imagen de perfil del usuario
export const updateUserProfileImage = async (userId: string, file: File): Promise<string> => {
  const storageRef = ref(storage, `profileImages/${userId}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    photoURL: url,
  });

  return url;
};

// Guardar suscripción
export const saveSubscription = async (
  userId: string,
  planName: string,
  planId: string,
  isRecurring: boolean,
) => {
  const subscriptionDate = new Date();
  const expirationDate = calculateExpirationDate(subscriptionDate, isRecurring);

  const subscription: Subscription = {
    subscriptionId: "", // Será generado automáticamente por Firestore
    userId, // Asegúrate de incluir userId
    planName,
    planId,
    subscriptionDate: subscriptionDate.toISOString(),
    expirationDate: expirationDate.toISOString(),
    isRecurring,
    status: "active",
  };

  const subscriptionRef = await addDoc(collection(db, "subscriptions"), subscription);
  subscription.subscriptionId = subscriptionRef.id;

  // Actualizar el documento con el ID generado
  await setDoc(doc(db, "subscriptions", subscriptionRef.id), subscription);

  // Actualizar el usuario con la referencia a la suscripción
  await updateDoc(doc(db, "users", userId), {
    subscriptionId: subscriptionRef.id,
  });

  return subscription;
};

// Obtener datos físicos del usuario
export const getUserPhysicalData = async (physicalDataId: string): Promise<PhysicalData | null> => {
  const docRef = doc(db, "physicalData", physicalDataId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as PhysicalData;
  } else {
    return null;
  }
};

// Guardar datos físicos del usuario
export const saveUserPhysicalData = async (userId: string, data: PhysicalData): Promise<string> => {
  try {
    const physicalDataRef = await addDoc(collection(db, "physicalData"), data);
    const physicalDataId = physicalDataRef.id;

    await updateDoc(physicalDataRef, { physicalDataId });

    // Actualizar el usuario con la referencia a los datos físicos
    await updateDoc(doc(db, "users", userId), {
      physicalDataId: physicalDataId,
    });

    return physicalDataId;
  } catch (error) {
    console.error("Error saving user physical data: ", error);
    return ""; // Devuelve un string vacío en caso de error
  }
};

// Actualizar datos físicos del usuario
export const updateUserPhysicalData = async (
  physicalDataId: string,
  data: Partial<PhysicalData>,
) => {
  const userRef = doc(db, "physicalData", physicalDataId);

  try {
    await updateDoc(userRef, data);
  } catch (error) {
    console.error("Error updating user physical data: ", error);
  }
};

// Función para calcular la fecha de expiración
const calculateExpirationDate = (subscriptionDate: Date, isRecurring: boolean): Date => {
  const expirationDate = new Date(subscriptionDate);
  if (isRecurring) {
    expirationDate.setMonth(expirationDate.getMonth() + 1);
  } else {
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  }
  return expirationDate;
};
