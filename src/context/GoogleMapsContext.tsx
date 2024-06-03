import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useStore } from "../store/store";
import { googleMapsConfig } from "../config/googleMapsConfig";

interface GoogleMapsContextProps {
  loaded: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextProps>({ loaded: false });

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};

export const GoogleMapsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { googleMapsLoaded, setGoogleMapsLoaded } = useStore();

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleMapsConfig.apiKey,
      libraries: googleMapsConfig.libraries,
    });

    loader.load().then(() => {
      setGoogleMapsLoaded(true);
    });
  }, [setGoogleMapsLoaded]);

  return (
    <GoogleMapsContext.Provider value={{ loaded: googleMapsLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
