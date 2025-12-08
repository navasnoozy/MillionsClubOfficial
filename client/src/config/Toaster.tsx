import { useTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = () => {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          // --- 1. Global Animations ---
          "@keyframes bounceIn": {
            "0%": { opacity: 0, transform: "scale(0.3)" },
            "50%": { opacity: 1, transform: "scale(1.05)" },
            "70%": { transform: "scale(0.9)" },
            "100%": { transform: "scale(1)" },
          },
          // Apply animation to the toast icon globally
          ".Toastify__toast-icon": {
            animation: "bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
          },

          // --- 2. Dark Mode Specific Overrides ---
          ...(theme.palette.mode === "dark" && {
            // Success Toast (Orange Background)
            ".Toastify__toast--success": {
              backgroundColor: "#ba612aff !important",
              color: "#ffffff",
            },
            // Force the success tick icon to be white
            ".Toastify__toast--success .Toastify__toast-icon > svg": {
              fill: "#ffffff",
            },
            // Timer Bar (Progress Bar) -> Dark Green
            // Added !important to override library defaults
            ".Toastify__progress-bar--success": {
              background: "#0cf01bff !important",
            },

            // Loading / Default Toast (Dark Gray)
            ".Toastify__toast--default": {
              backgroundColor: "#333333 !important", 
              color: "#ffffff",
            },
            // Ensure close button is visible
            ".Toastify__close-button": {
              color: "#ffffff",
            },
          }),
        }}
      />
      <ToastContainer
        theme={theme.palette.mode === "dark" ? "colored" : "light"}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Toaster;