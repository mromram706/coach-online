import { GoogleMapsLibraries } from "./GoogleMapsLibraries";

export const googleMapsConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyB0UW9QiK1Ro73jR_cB2gIyELTEao_XbZI",
  libraries: [
    GoogleMapsLibraries.Drawing,
    GoogleMapsLibraries.Geometry,
    GoogleMapsLibraries.Places,
    GoogleMapsLibraries.Visualization,
  ],
};
