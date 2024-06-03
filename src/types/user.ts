import { Subscription } from "./subscription";
import { PhysicalData } from "./physicalData";

export type User = {
  userId: string;
  name?: string;
  email: string;
  photoURL?: string;
  address?: string;
  streetName?: string;
  number?: string;
  additionalData?: string;
  province?: string;
  city?: string;
  postalCode?: string;
  birthDate?: string;
  height?: string;
  weight?: string;
  subscriptionId?: string;
  subscription?: Subscription | null;
  benefits?: string[];
  physicalDataId?: string;
  physicalData?: PhysicalData | null;
};
