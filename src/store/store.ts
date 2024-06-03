import { create } from "zustand";
import { useAuthError } from "../hooks/useAuthError";
import featuresHomeData from "../../data/featuresHome.json";
import plansData from "../../data/plans.json";
import { FirebaseError } from "firebase/app";
import { User } from "../types/user";
import { AddressFormData } from "../types/formData";
import { Subscription } from "../types/subscription";
import { PhysicalData } from "../types/physicalData";

type Store = {
  hasMounted: boolean;
  setMounted: () => void;
  featuresHome: typeof featuresHomeData;
  plans: typeof plansData;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  session: any;
  setSession: (session: any) => void;
  error: string | null;
  setError: (error: string | null) => void;
  handleError: (error: { code: any }) => void;
  firebaseError: FirebaseError | null;
  setFirebaseError: (error: FirebaseError | null) => void;
  handleFirebaseError: (error: FirebaseError) => void;
  registerSuccess: boolean;
  setRegisterSuccess: (success: boolean) => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  updateSubscription: (subscription: Subscription | null) => void;
  updatePhysicalData: (physicalData: PhysicalData | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isErrorPopupOpen: boolean;
  errorMessage: string;
  setIsErrorPopupOpen: (isOpen: boolean) => void;
  setErrorMessage: (message: string) => void;
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
  isBouncing: boolean;
  setIsBouncing: (isBouncing: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  toggleMobileOpen: () => void;
  headerHeight: number;
  footerHeight: number;
  setHeaderHeight: (value: number) => void;
  setFooterHeight: (value: number) => void;
  address: AddressFormData;
  setAddress: (address: AddressFormData) => void;
  googleMapsLoaded: boolean;
  setGoogleMapsLoaded: (loaded: boolean) => void;
  locale: string;
  setLocale: (locale: string) => void;
  showFooter: boolean;
  setShowFooter: (show: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  hasMounted: false,
  setMounted: () => set({ hasMounted: true }),
  featuresHome: featuresHomeData,
  plans: plansData,
  currentPage: 0,
  setCurrentPage: (page) =>
    set((state) => {
      if (state.currentPage !== page) {
        console.log("Setting currentPage:", page);
        return { currentPage: page };
      }
      return state;
    }),
  session: null,
  setSession: (session) => set({ session }),
  error: null,
  setError: (error) => set({ error }),
  handleError: useAuthError((error) => set({ error })),
  firebaseError: null,
  setFirebaseError: (error) => set({ firebaseError: error }),
  handleFirebaseError: (error) => set({ firebaseError: error }),
  registerSuccess: false,
  setRegisterSuccess: (success) => set({ registerSuccess: success }),
  dialogOpen: false,
  setDialogOpen: (open) => set({ dialogOpen: open }),
  user: null,
  setUser: (user) => set({ user }),
  updateSubscription: (subscription) =>
    set((state) => {
      if (state.user) {
        state.user.subscription = subscription;
      }
      return state;
    }),
  updatePhysicalData: (physicalData) =>
    set((state) => {
      if (state.user) {
        state.user.physicalData = physicalData;
        state.user.physicalDataId = physicalData?.physicalDataId;
      }
      return state;
    }),
  loading: true,
  setLoading: (loading) => set({ loading }),
  isErrorPopupOpen: false,
  errorMessage: "",
  setIsErrorPopupOpen: (isOpen) => set({ isErrorPopupOpen: isOpen }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  imageLoaded: false,
  setImageLoaded: (loaded) => set({ imageLoaded: loaded }),
  isBouncing: false,
  setIsBouncing: (isBouncing) => set({ isBouncing }),
  mobileOpen: false,
  setMobileOpen: (value) => set({ mobileOpen: value }),
  toggleMobileOpen: () => set((state) => ({ mobileOpen: !state.mobileOpen })),
  headerHeight: 0,
  footerHeight: 0,
  setHeaderHeight: (height) => set({ headerHeight: height }),
  setFooterHeight: (height) => set({ footerHeight: height }),
  address: {} as AddressFormData,
  setAddress: (address) => set({ address }),
  googleMapsLoaded: false,
  setGoogleMapsLoaded: (loaded) => set({ googleMapsLoaded: loaded }),
  locale: "en",
  setLocale: (locale: string) => set({ locale }),
  showFooter: true,
  setShowFooter: (show) => set({ showFooter: show }),
}));
