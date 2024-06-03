import { FirebaseError } from "firebase/app";

export const handleFirebaseError = (
  error: FirebaseError,
  handleError: (message: string) => void,
) => {
  let errorMessage = "";

  switch (error.code) {
    case "auth/email-already-in-use":
      errorMessage = "Este correo electrónico ya está en uso.";
      break;
    case "auth/invalid-email":
      errorMessage = "El correo electrónico proporcionado no es válido.";
      break;
    case "auth/operation-not-allowed":
      errorMessage = "La operación no está permitida.";
      break;
    case "auth/weak-password":
      errorMessage = "La contraseña es demasiado débil.";
      break;
    default:
      errorMessage = "Ocurrió un error desconocido.";
  }

  handleError(errorMessage);
};
