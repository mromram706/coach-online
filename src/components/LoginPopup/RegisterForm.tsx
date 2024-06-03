import React from "react";
import { Box, TextField, Button, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { useStore } from "../../store/store";
import GoogleIcon from "@mui/icons-material/Google";
import { RegisterFormValues } from "../../types/formTypes";
import { registerForm, signInWithGoogle } from "../../lib/auth";
import { handleFirebaseError } from "../../lib/firebaseUtils";
import { FirebaseError } from "firebase/app";
import { useIntl } from "react-intl";

type RegisterFormProps = {
  handleClose: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ handleClose }) => {
  const {
    setSession,
    setRegisterSuccess,
    setLoading,
    loading,
    setIsErrorPopupOpen,
    setErrorMessage,
  } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ mode: "onBlur" });
  const intl = useIntl();
  const theme = useTheme();

  const handleRegister = async (data: RegisterFormValues) => {
    setLoading(true);
    try {
      const user = await registerForm(data, handleClose);
      setSession(user);
      setRegisterSuccess(true);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      setIsErrorPopupOpen(true);
      setErrorMessage(firebaseError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle(() => {
        handleClose();
      });
      setSession(user);
    } catch (error) {
      setIsErrorPopupOpen(true);
      setErrorMessage(intl.formatMessage({ id: "error.failedLogin" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleRegister)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        {...register("name", { required: intl.formatMessage({ id: "register.nameRequired" }) })}
        label={intl.formatMessage({ id: "register.name" })}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        fullWidth
        InputLabelProps={{ style: { color: theme.palette.text.primary } }}
        InputProps={{
          style: { color: theme.palette.text.primary },
        }}
      />
      <TextField
        {...register("email", {
          required: intl.formatMessage({ id: "register.emailRequired" }),
          pattern: {
            value: /^\S+@\S+$/i,
            message: intl.formatMessage({ id: "register.invalidEmail" }),
          },
        })}
        label={intl.formatMessage({ id: "register.email" })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        fullWidth
        InputLabelProps={{ style: { color: theme.palette.text.primary } }}
        InputProps={{
          style: { color: theme.palette.text.primary },
        }}
      />
      <TextField
        {...register("password", {
          required: intl.formatMessage({ id: "register.passwordRequired" }),
          minLength: {
            value: 8,
            message: intl.formatMessage({ id: "register.passwordMinLength" }),
          },
        })}
        label={intl.formatMessage({ id: "register.password" })}
        type="password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        fullWidth
        InputLabelProps={{ style: { color: theme.palette.text.primary } }}
        InputProps={{
          style: { color: theme.palette.text.primary },
        }}
      />
      <Button
        type="submit"
        disabled={loading}
        sx={{
          backgroundColor: theme.palette.register.main,
          color: theme.palette.register.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.register.dark,
          },
          width: "100%",
          height: "40px",
        }}
      >
        {intl.formatMessage({ id: "register.submit" })}
      </Button>
      <Button
        startIcon={<GoogleIcon />}
        onClick={() => handleLogin()}
        disabled={loading}
        sx={{
          backgroundColor: theme.palette.google.main,
          color: theme.palette.google.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.google.dark,
          },
          width: "100%",
          height: "40px",
        }}
      >
        {intl.formatMessage({ id: "register.google" })}
      </Button>
    </Box>
  );
};

export default RegisterForm;
