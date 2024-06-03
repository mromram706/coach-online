import { removeAccentsAndUppercase } from "./textTransform";
import { AddressFormData } from "../types/formData";

export const mapAddressComponents = (
  components: google.maps.GeocoderAddressComponent[],
): Partial<AddressFormData> => {
  const address: Partial<AddressFormData> = {};
  components.forEach((component) => {
    if (component.types.includes("route")) {
      address.nombreVia = removeAccentsAndUppercase(component.long_name).trim();
    }
    if (component.types.includes("street_number")) {
      address.numero = removeAccentsAndUppercase(component.long_name).trim();
    }
    if (component.types.includes("postal_code")) {
      address.codigoPostal = removeAccentsAndUppercase(component.long_name).trim();
    }
    if (component.types.includes("locality")) {
      address.localidad = removeAccentsAndUppercase(component.long_name).trim();
    }
    if (component.types.includes("administrative_area_level_2")) {
      address.municipio = removeAccentsAndUppercase(component.long_name).trim();
    }
    if (component.types.includes("administrative_area_level_1")) {
      address.provincia = removeAccentsAndUppercase(component.long_name).trim();
    }
    if (component.types.includes("country")) {
      address.pais = {
        code: component.short_name,
        name: removeAccentsAndUppercase(component.long_name).trim(),
      };
    }
  });
  return address;
};
