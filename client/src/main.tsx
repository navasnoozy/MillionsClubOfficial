import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import queryClient from "./lib/queryClient.ts";
import "./main.css";
import router from "./Router.tsx";
import { theme } from "./theme.ts";
import Toaster from "./config/Toaster.tsx";


// import { Provider } from "react-redux";
// import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
     <Toaster />
      <QueryClientProvider client={queryClient}>
        {/* <Provider store={store}> */}
        <RouterProvider router={router} />
        {/* </Provider> */}
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
