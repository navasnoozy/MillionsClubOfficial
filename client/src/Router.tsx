// router.tsx
import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import Signup from "./auth/signup";
import Signin from "./auth/signin";
import Layout from "./layouts/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />, // ✅ used directly now
    children: [
      { path: "/", element: <HomePage />, errorElement: <ErrorBoundary /> },
      { path: "/signup", element: <Signup />, errorElement: <ErrorBoundary /> },
      { path: "/signin", element: <Signin />, errorElement: <ErrorBoundary /> },
    ],
  },
]);

export default router;
