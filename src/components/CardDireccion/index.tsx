import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, Box, Paper, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddressAutocomplete from "../AddressAutocomplete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useStore } from "../../store/store";
import { AddressFormData, Country } from "../../types/formData";
import { getCountries } from "../../utils/countries";
import { mapAddressComponents } from "../../utils/addressMapping";
import { saveUserAddress, getUserAddress } from "../../lib/firestore";
import RequiredFields from "./RequiredFields";
import OptionalFields from "./OptionalFields";
import { removeAccentsAndUppercase } from "../../utils/textTransform";
import { useIntl } from "react-intl";

const schema = yup.object().shape({
  nombreVia: yup
    .string()
    .required("Nombre de la vía es obligatorio (*)")
    .matches(/^[a-zA-Z0-9\s/.,-]*$/, "No se permiten caracteres especiales")
    .transform((value) => removeAccentsAndUppercase(value ?? "").trim()),
  numero: yup
    .string()
    .required("Número es obligatorio (*)")
    .matches(/^[a-zA-Z0-9\s/.,-\/]*$/, "Debe ser un número, 'S/N' o 'BIS'")
    .default("S/N")
    .transform((value) => removeAccentsAndUppercase(value === "" ? "S/N" : value ?? "").trim()),
  codigoPostal: yup
    .string()
    .required("Código postal es obligatorio (*)")
    .matches(
      /^[a-zA-Z0-9\s-]{3,10}$/,
      "Debe tener entre 3 y 10 caracteres y puede incluir letras, cifras y guiones",
    )
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
  pais: yup.object().shape({
    code: yup.string().required(),
    name: yup.string().required("País es obligatorio (*)"),
  }),
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

const CardDireccion: React.FC = () => {
  const { setAddress, user } = useStore();
  const countries = getCountries();
  const [isEditing, setIsEditing] = useState(false);
  const intl = useIntl();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<AddressFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      nombreVia: "",
      numero: "S/N",
      codigoPostal: "",
      localidad: "",
      municipio: "",
      provincia: "",
      pais: { name: "", code: "" },
      bloque: "",
      portal: "",
      escalera: "",
      piso: "",
      puerta: "",
    },
  });

  useEffect(() => {
    const fetchAddress = async () => {
      if (user) {
        const address = await getUserAddress(user.userId);
        if (address) {
          reset(address);
        }
      }
    };

    fetchAddress();
  }, [user, reset]);

  const onSubmit = async (data: AddressFormData) => {
    const uppercasedData = Object.keys(data).reduce((acc, key) => {
      const value = data[key as keyof AddressFormData];

      if (typeof value === "string") {
        acc[key as keyof AddressFormData] = removeAccentsAndUppercase(value) as any;
      } else if (typeof value === "object" && value !== null) {
        acc[key as keyof AddressFormData] = value as any;
      }

      return acc;
    }, {} as AddressFormData);

    console.log(uppercasedData);

    if (user) {
      await saveUserAddress(user.userId, uppercasedData);
      setIsEditing(false);
    } else {
      console.error("User not logged in");
    }
  };

  const handleSelectAddress = (details: {
    country: string;
    countryCode: string;
    addressComponents: google.maps.GeocoderAddressComponent[];
  }) => {
    const address = mapAddressComponents(details.addressComponents);
    Object.keys(address).forEach((key) => {
      setValue(key as keyof AddressFormData, address[key as keyof AddressFormData]);
    });

    const matchingCountry = countries.find((c) => c.code === details.countryCode);
    if (matchingCountry) {
      setValue("pais", matchingCountry);
    } else {
      console.warn(`Country with code ${details.countryCode} not found in the list`);
    }
    setAddress(address as AddressFormData);
  };

  const handleBlur = (field: keyof AddressFormData, value: string | undefined) => {
    setValue(field, removeAccentsAndUppercase(value ?? "").trim());
  };
  const paisValue = watch("pais");

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" gutterBottom>
            {intl.formatMessage({ id: "profile.address" })}
          </Typography>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSubmit(onSubmit)}
            >
              {intl.formatMessage({ id: "profile.save" })}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              {intl.formatMessage({ id: "profile.edit" })}
            </Button>
          )}
        </Box>
        {isEditing && (
          <Box mt={2}>
            <AddressAutocomplete
              label={intl.formatMessage({ id: "profile.searchAddress" })}
              onSelectAddress={handleSelectAddress}
            />
          </Box>
        )}
        <Grid container spacing={2} alignItems="center" mt={2}>
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {intl.formatMessage({ id: "profile.requiredFields" })}
              </Typography>
              <Divider />
              <RequiredFields
                control={control}
                errors={errors}
                setValue={setValue}
                paisValue={paisValue}
                handleBlur={handleBlur}
                disabled={!isEditing}
                isEditing={isEditing}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {intl.formatMessage({ id: "profile.optionalFields" })}
              </Typography>
              <Divider />
              <OptionalFields
                control={control}
                errors={errors}
                setValue={setValue}
                handleBlur={handleBlur}
                disabled={!isEditing}
                isEditing={isEditing}
              />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardDireccion;
