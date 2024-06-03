import React from "react";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { useStore } from "../../store/store";
import { handleFirebaseError } from "../../lib/firebaseUtils";
import { signIn, signInWithGoogle } from "../../lib/auth";
import { LoginFormValues } from "../../types/formTypes";
import { Box, TextField, Button, useTheme } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useIntl } from "react-intl";

type LoginFormProps = {
  handleClose: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const { setIsErrorPopupOpen, setErrorMessage, setSession, setLoading, loading } = useStore();
  const intl = useIntl();
  const theme = useTheme();

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const user = await signIn(data.email, data.password, handleClose);
      setSession(user);
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
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        {...register("email", {
          required: intl.formatMessage({ id: "login.emailRequired" }),
          pattern: {
            value: /^\S+@\S+$/i,
            message: intl.formatMessage({ id: "login.invalidEmail" }),
          },
        })}
        label={intl.formatMessage({ id: "login.email" })}
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
          required: intl.formatMessage({ id: "login.passwordRequired" }),
          minLength: { value: 8, message: intl.formatMessage({ id: "login.passwordMinLength" }) },
        })}
        label={intl.formatMessage({ id: "login.password" })}
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
          backgroundColor: theme.palette.success.main,
          color: theme.palette.common.white,
          "&:hover": {
            backgroundColor: theme.palette.success.dark,
          },
          width: "100%",
          height: "40px",
        }}
      >
        {intl.formatMessage({ id: "login.submit" })}
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
        {intl.formatMessage({ id: "login.google" })}
      </Button>
    </Box>
  );
};

export default LoginForm;
