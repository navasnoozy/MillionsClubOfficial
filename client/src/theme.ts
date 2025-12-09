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
          // main: "#86624B",
          main: "#bb510fff",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
  },
  //  shadows: customShadows,

  shape: {
    borderRadius: 4,
  },
  components:{
    MuiTextField:{
      styleOverrides:{
        root:{
            "& .MuiOutlinedInput-input": {
              padding: "7px 10px", // Reduces height to approx 32px-34px
              fontSize: "0.875rem", // Adjust font size for compact look
            },
            // 2. Adjust label position to center it vertically given the new padding
            "& .MuiInputLabel-root": {
              transform: "translate(14px, 7px) scale(1)", // Start position
              "&.Mui-focused, &.MuiFormLabel-filled": {
                transform: "translate(14px, -9px) scale(0.75)", // Floating position
              },
            },
        }
      }
    },
  }
});
