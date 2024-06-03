import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { Country } from "../types/formData";

countries.registerLocale(enLocale);

export const getCountries = (): Country[] => {
  const countryObj = countries.getNames("en", { select: "official" });
  const countryArray = Object.entries(countryObj).map(([code, name]) => ({
    code,
    name: name.toUpperCase(),
  }));

  return [{ code: "", name: "" }, ...countryArray];
};
