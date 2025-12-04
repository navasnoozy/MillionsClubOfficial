import { createTheme, type Shadows } from "@mui/material";

// Get default shadows first
const defaultTheme = createTheme();
const customShadows = [...defaultTheme.shadows] as Shadows;
customShadows[1] = "1px 2px 4px rgba(88, 186, 42, 0.93)"; // Paper default elevation

export const theme = createTheme({
  defaultColorScheme: "light",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#ba612aff",
        },
        background: {
          default: "#FCFAF8",
          paper: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#86624B",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
  },
  //  shadows: customShadows,
   shape:{borderRadius:2}
});
