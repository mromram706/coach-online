import React from "react";
import { Grid, Typography } from "@mui/material";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { AddressFormData, Country } from "../../types/formData";
import CountrySelector from "../CountrySelector";
import FormField from "../FormField";
import { useIntl } from "react-intl";

type RequiredFieldsProps = {
  control: Control<AddressFormData>;
  errors: FieldErrors<AddressFormData>;
  setValue: UseFormSetValue<AddressFormData>;
  paisValue: Country;
  handleBlur: (field: keyof AddressFormData, value: string | undefined) => void;
  disabled: boolean;
  isEditing: boolean;
};

const RequiredFields: React.FC<RequiredFieldsProps> = ({
  control,
  errors,
  setValue,
  paisValue,
  handleBlur,
  disabled,
  isEditing,
}) => {
  const intl = useIntl();

  const handleBlurString = (field: string, value: string | undefined) =>
    handleBlur(field as keyof AddressFormData, value);

  const handleFocusNumero = (field: string, value: string | undefined) => {
    if (field === "numero" && value === "S/N") {
      setValue("numero", "");
    }
  };

  const handleBlurNumero = (field: string, value: string | undefined) => {
    if (field === "numero" && (!value || value.trim() === "")) {
      setValue("numero", "S/N");
    } else {
      handleBlur(field as keyof AddressFormData, value);
    }
  };

  return (
    <Grid container spacing={2}>
      <FormField
        control={control}
        name="nombreVia"
        label={intl.formatMessage({ id: "profile.streetName" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurString}
        disabled={disabled}
      />
      <FormField
        control={control}
        name="numero"
        label={intl.formatMessage({ id: "profile.number" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurNumero}
        handleFocus={handleFocusNumero}
        disabled={disabled}
      />
      <FormField
        control={control}
        name="codigoPostal"
        label={intl.formatMessage({ id: "profile.postalCode" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurString}
        disabled={disabled}
      />
      <FormField
        control={control}
        name="localidad"
        label={intl.formatMessage({ id: "profile.locality" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurString}
        disabled={disabled}
      />
      <FormField
        control={control}
        name="municipio"
        label={intl.formatMessage({ id: "profile.province" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurString}
        disabled={disabled}
      />
      <FormField
        control={control}
        name="provincia"
        label={intl.formatMessage({ id: "profile.autonomousCommunity" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurString}
        disabled={disabled}
      />
      <Grid item xs={12} sm={6} md={4}>
        {isEditing ? (
          <CountrySelector
            control={control}
            setValue={setValue}
            value={paisValue}
            name="pais"
            error={!!errors.pais}
            helperText={errors.pais ? errors.pais.message : ""}
            disabled={disabled}
          />
        ) : (
          <>
            <Typography variant="caption">
              {intl.formatMessage({ id: "profile.country" })}
            </Typography>
            <Typography>{control._formValues?.pais?.name || "No especificado"}</Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default RequiredFields;
