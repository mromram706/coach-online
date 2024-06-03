export function useAuthError(setError: (error: string | null) => void) {
  const handleError = (error: { code: any }) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setError("Este correo electrónico ya está en uso.");
        break;
      case "auth/invalid-email":
        setError("El correo electrónico no es válido.");
        break;
      case "auth/operation-not-allowed":
        setError("La operación no está permitida.");
        break;
      case "auth/weak-password":
        setError("La contraseña es demasiado débil.");
        break;
      default:
        setError("Ocurrió un error desconocido.");
        break;
    }
  };

  return handleError;
}
