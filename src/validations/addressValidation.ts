import * as yup from "yup";
import { removeAccentsAndUppercase } from "../utils/textTransform";

export const addressSchema = yup.object().shape({
  nombreVia: yup
    .string()
    .required("Nombre de la vía es obligatorio (*)")
    .matches(/^[a-zA-Z0-9\s/.,-]*$/, "No se permiten caracteres especiales")
    .transform((value) => removeAccentsAndUppercase(value ?? "").trim()),
  numero: yup
    .string()
    .required("Número es obligatorio (*)")
    .matches(/^(?:\d+|S\/N|BIS)$/, "Debe ser un número, 'S/N' o 'BIS'")
    .default("S/N")
    .transform((value) => (value === "" ? "S/N" : removeAccentsAndUppercase(value ?? "").trim())),
  codigoPostal: yup
    .string()
    .required("Código postal es obligatorio (*)")
    .matches(/^\d{5}$/, "Debe tener 5 cifras")
    .transform((value) => (value ?? "").trim()),
  localidad: yup
    .string()
    .required("Localidad es obligatoria (*)")
    .matches(/^[a-zA-Z\s/.,-]*$/, "No se permiten caracteres especiales")
    .transform((value) => removeAccentsAndUppercase(value ?? "").trim()),
  municipio: yup
    .string()
    .required("Provincia es obligatoria (*)")
    .matches(/^[a-zA-Z\s/.,-]*$/, "No se permiten caracteres especiales")
    .transform((value) => removeAccentsAndUppercase(value ?? "").trim()),
  provincia: yup
    .string()
    .required("Comunidad Autónoma es obligatoria (*)")
    .matches(/^[a-zA-Z\s/.,-]*$/, "No se permiten caracteres especiales")
    .transform((value) => removeAccentsAndUppercase(value ?? "").trim()),
  pais: yup
    .object()
    .shape({
      code: yup.string().required(),
      name: yup.string().required(),
    })
    .required("País es obligatorio (*)"),
  bloque: yup
    .string()
    .optional()
    .transform((value) => removeAccentsAndUppercase(value ?? "").trim()),
  portal: yup
    .string()
    .optional()
    .transform((value) => removeAccentsAndUppercase(value ?? "").trim()),
  escalera: yup
    .string()
    .optional()
    .transform((value) => removeAccentsAndUppercase(value ?? "").trim()),
  piso: yup
    .string()
    .optional()
    .transform((value) => removeAccentsAndUppercase(value ?? "").trim()),
  puerta: yup
    .string()
    .optional()
    .transform((value) => removeAccentsAndUppercase(value ?? "").trim()),
});
