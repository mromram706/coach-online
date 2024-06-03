import React from "react";
import { Grid } from "@mui/material";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { AddressFormData } from "../../types/formData";
import FormField from "../FormField";
import { useIntl } from "react-intl";

type OptionalFieldsProps = {
  control: Control<AddressFormData>;
  errors: FieldErrors<AddressFormData>;
  setValue: UseFormSetValue<AddressFormData>;
  handleBlur: (field: keyof AddressFormData, value: string | undefined) => void;
  disabled: boolean;
  isEditing: boolean;
};

const OptionalFields: React.FC<OptionalFieldsProps> = ({
  control,
  errors,
  setValue,
  handleBlur,
  disabled,
  isEditing,
}) => {
  const intl = useIntl();

  const handleBlurString = (field: string, value: string | undefined) =>
    handleBlur(field as keyof AddressFormData, value);

  return (
    <Grid container spacing={2}>
      <FormField
        control={control}
        name="bloque"
        label={intl.formatMessage({ id: "profile.block" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurString}
        disabled={disabled}
      />
      <FormField
        control={control}
        name="portal"
        label={intl.formatMessage({ id: "profile.doorway" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurString}
        disabled={disabled}
      />
      <FormField
        control={control}
        name="escalera"
        label={intl.formatMessage({ id: "profile.staircase" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurString}
        disabled={disabled}
      />
      <FormField
        control={control}
        name="piso"
        label={intl.formatMessage({ id: "profile.floor" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurString}
        disabled={disabled}
      />
      <FormField
        control={control}
        name="puerta"
        label={intl.formatMessage({ id: "profile.door" })}
        errors={errors}
        isEditing={isEditing}
        handleBlur={handleBlurString}
        disabled={disabled}
      />
    </Grid>
  );
};

export default OptionalFields;
