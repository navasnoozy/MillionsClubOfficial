import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { theme } from "./theme.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router";
import router from "./Router.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/queryClient.ts";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
