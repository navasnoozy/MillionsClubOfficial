// router.tsx
import { createBrowserRouter } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ProductManagement from "./features/products/pages/ProductManagement";
import OrderManagement from "./features/order/pages/OrderManagement";
import SignupPage from "./features/auth/pages/SignupPage";
import SigninPage from "./features/auth/pages/SigninPage";
import AddProduct from "./features/products/pages/AddProduct";
import AddVariant from "./features/products/pages/AddVariant";
// import RequireAdmin from "./components/RequireAdmin";


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
  {
    path: "/admin",
    element: (
      // <RequireAdmin>
      <AdminLayout />
//  </RequireAdmin>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "productmanagement",
        element: <ProductManagement />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
        errorElement: <ErrorBoundary />,
      },
          {
        path: "addvariant/:id",
        element: <AddVariant />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "ordermanagement",
        element: <OrderManagement />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

export default router;
