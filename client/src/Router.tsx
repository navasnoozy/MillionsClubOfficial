// router.tsx
import { createBrowserRouter } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
// import AdminLayout from "./layouts/AdminLayout";
// import AdminDashboard from "./pages/AdminDashboard";
// import ProductManagement from "./pages/ProductManagement";
// import OrderManagement from "./pages/OrderManagement";
// import RequireAdmin from "./components/admin/RequireAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomePage />, errorElement: <ErrorBoundary /> },
      {
        path: "signup",
        element: <SignupPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "signin",
        element: <SigninPage />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
  
]);

export default router;
