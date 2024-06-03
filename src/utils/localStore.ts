import { User } from "../types/user";
export function setAuthLocalStorages(user: User) {
  localStorage.setItem("auth", JSON.stringify(user));
}

export function getAuthLocalStorages() {
  const auth = localStorage.getItem("auth");
  return auth ? JSON.parse(auth) : null;
}
