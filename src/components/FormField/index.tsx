import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { useIntl } from "react-intl";

type FormFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  errors: FieldErrors<any>;
  isEditing: boolean;
  handleBlur: (field: string, value: string | undefined) => void;
  handleFocus?: (field: string, value: string | undefined) => void;
  disabled: boolean;
  renderField?: () => React.ReactNode;
};

const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  errors,
  isEditing,
  handleBlur,
  handleFocus,
  disabled,
  renderField,
}) => {
  const intl = useIntl();
  const value = control._formValues ? control._formValues[name] : "";

  return (
    <Grid item xs={12} sm={6} md={4}>
      {isEditing && renderField ? (
        renderField()
      ) : isEditing ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={label}
              fullWidth
              error={!!errors[name]}
              helperText={errors[name] ? (errors[name] as any).message : ""}
              onBlur={() => handleBlur(name, field.value)}
              onFocus={() => handleFocus && handleFocus(name, field.value)}
              disabled={disabled}
            />
          )}
        />
      ) : (
        <>
          <Typography variant="caption">{label.replace("(*)", "")}</Typography>
          <Typography>{value || intl.formatMessage({ id: "formField.noSpecified" })}</Typography>
        </>
      )}
    </Grid>
  );
};

export default FormField;
