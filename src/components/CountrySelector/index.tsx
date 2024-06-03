import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, createTheme, ThemeProvider, useTheme } from "@mui/material";
import { Controller, Control, UseFormSetValue } from "react-hook-form";
import { Country, AddressFormData } from "../../types/formData";
import { getCountries } from "../../utils/countries";

type CountrySelectorProps = {
  control: Control<AddressFormData>;
  setValue: UseFormSetValue<AddressFormData>;
  value?: Country | null;
  name: keyof AddressFormData;
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
};

const CountrySelector: React.FC<CountrySelectorProps> = ({
  control,
  setValue,
  value = null,
  name,
  error,
  helperText,
  disabled = false,
}) => {
  const countries = getCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(value);
  const [inputCountry, setInputCountry] = useState<string>(value?.name || "");
  const theme = useTheme();

  useEffect(() => {
    setSelectedCountry(value);
    setInputCountry(value?.name || "");
  }, [value]);

  const customTheme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": {
              border: `2px dashed ${theme.palette.text.primary}`,
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.primary,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Controller
        name={name}
        control={control}
        rules={{ required: "País es obligatorio (*)" }}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            options={countries}
            getOptionLabel={(option) => option.name || ""}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            value={selectedCountry}
            onChange={(event, newValue) => {
              setSelectedCountry(newValue);
              setValue(name, newValue || { code: "", name: "" }, { shouldValidate: true });
            }}
            inputValue={inputCountry}
            onInputChange={(event, newInputValue) => {
              setInputCountry(newInputValue);
            }}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label="País (*)"
                fullWidth
                error={!!error}
                helperText={error ? error.message : helperText}
                InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                InputProps={{
                  ...params.InputProps,
                  style: { color: theme.palette.text.primary },
                }}
              />
            )}
          />
        )}
      />
    </ThemeProvider>
  );
};

export default CountrySelector;
