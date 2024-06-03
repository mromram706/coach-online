import { PaletteOptions, PaletteColorOptions, PaletteColor } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    google: PaletteColor;
    register: PaletteColor;
    gradient: PaletteColor;
    transparente: PaletteColor;
  }
  interface PaletteOptions {
    google?: PaletteColorOptions;
    register?: PaletteColorOptions;
    gradient?: PaletteColorOptions;
    transparente?: PaletteColor;

  }
}
