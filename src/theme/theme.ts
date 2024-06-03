import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Activa el modo oscuro
    primary: {
      main: "#A2C662", // Verde oliva menos saturado
    },
    secondary: {
      main: "#FFFFFF", // Blanco para texto y acentos
    },
    transparente: {
      main: "rgba(0, 0, 0, 0.5)", // Color personalizado para el fondo transparente
      light: "rgba(0, 0, 0, 0.7)", // Light color for transparency
      dark: "rgba(0, 0, 0, 0.3)", // Dark color for transparency
      contrastText: "#FFFFFF", // Contrast text color for transparency
    },
    background: {
      default: "#121212", // Muy oscuro para el fondo principal
      paper: "#1E1E1E", // Gris oscuro para fondos de papel
    },
    text: {
      primary: "#FFFFFF", // Blanco para el texto principal
      secondary: "#B5C58F", // Verde oliva menos saturado para el texto secundario
    },
    success: {
      main: "#4CAF50", // Verde para estados de éxito
    },
    error: {
      main: "#F44336", // Rojo para estados de error
    },
    warning: {
      main: "#FF9800", // Naranja para estados de advertencia
    },
    info: {
      main: "#2196F3", // Azul para información
    },
    google: {
      main: "#DB4437", // Color personalizado para el botón de Google
      contrastText: "#FFFFFF", // Texto en blanco para el botón de Google
    },
    register: {
      main: "#1976D2", // Color personalizado para el botón de registro
      contrastText: "#FFFFFF", // Texto en blanco para el botón de registro
    },
    gradient: {
      main: "linear-gradient(90deg, rgba(181,197,143,1) 0%, rgba(181,197,143,0.7) 30%, rgba(181,197,143,0.4) 60%, rgba(255,255,255,0) 100%)", // Basado en el color primario
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      color: "#FFFFFF",
    },
    h2: {
      color: "#FFFFFF",
    },
    h3: {
      color: "#FFFFFF",
    },
    h4: {
      color: "#FFFFFF",
    },
    h5: {
      color: "#FFFFFF",
    },
    h6: {
      color: "#FFFFFF",
    },
    body1: {
      color: "#FFFFFF",
    },
    body2: {
      color: "#B5C58F",
    },
  },
  shape: {
    borderRadius: 8, // Borde redondeado
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
    "0px 1px 5px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    "0px 1px 8px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px rgba(0, 0, 0, 0.14), 0px 1px 14px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)",
    "0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px rgba(0, 0, 0, 0.14), 0px 2px 16px rgba(0, 0, 0, 0.12)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12)",
    "0px 5px 6px -3px rgba(0, 0, 0, 0.2), 0px 9px 12px rgba(0, 0, 0, 0.14), 0px 3px 16px rgba(0, 0, 0, 0.12)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px rgba(0, 0, 0, 0.14), 0px 4px 18px rgba(0, 0, 0, 0.12)",
    "0px 6px 7px -4px rgba(0, 0, 0, 0.2), 0px 11px 15px rgba(0, 0, 0, 0.14), 0px 4px 20px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px rgba(0, 0, 0, 0.14), 0px 5px 22px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px rgba(0, 0, 0, 0.14), 0px 5px 24px rgba(0, 0, 0, 0.12)",
    "0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px rgba(0, 0, 0, 0.14), 0px 5px 26px rgba(0, 0, 0, 0.12)",
    "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px rgba(0, 0, 0, 0.14), 0px 6px 28px rgba(0, 0, 0, 0.12)", // shadows[16]
    "0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12)",
    "0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px rgba(0, 0, 0, 0.14), 0px 6px 32px rgba(0, 0, 0, 0.12)",
    "0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px rgba(0, 0, 0, 0.14), 0px 7px 34px rgba(0, 0, 0, 0.12)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px rgba(0, 0, 0, 0.14), 0px 7px 36px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px rgba(0, 0, 0, 0.14), 0px 8px 38px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px rgba(0, 0, 0, 0.14), 0px 8px 40px rgba(0, 0, 0, 0.12)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px rgba(0, 0, 0, 0.14), 0px 8px 42px rgba(0, 0, 0, 0.12)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px rgba(0, 0, 0, 0.14), 0px 9px 44px rgba(0, 0, 0, 0.12)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px rgba(0, 0, 0, 0.14), 0px 9px 44px rgba(0, 0, 0, 0.12)",
  ],
});

export default theme;
