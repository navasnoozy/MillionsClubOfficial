// router.tsx
import { createBrowserRouter } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import SigninPage from "./features/auth/pages/SigninPage";
import SignupPage from "./features/auth/pages/SignupPage";
import CategoryManagement from "./admin/pages/CategoryManagement";
import OrderManagement from "./admin/pages/OrderManagement";
import AdminLayout from "./layouts/AdminLayout";
import Layout from "./layouts/Layout";

import HomePage from "./pages/HomePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import VerificationPage from "./features/auth/pages/VerificationPage";
import PersistLogin from "./components/PersistLogin";
import OauthCallback from "./features/auth/components/OauthCallback";
import AddCategoryPage from "./admin/pages/AddCategoryPage";
import AddSubCategoryPage from "./admin/pages/AddSubCategoryPage";
import AdminAddProductPage from "./admin/pages/AdminAddProductPage";
import AdminAddVariantPage from "./admin/pages/AdminAddVariantPage";
import ProductManagement from "./admin/pages/ProductManagement";
import AdminDashboard from "./admin/pages/AdminDashboard";
import UserManagement from "./admin/user-management/page/UserManagement";

const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "signup",
            element: <SignupPage />,
          },
          {
            path: "signin",
            element: <SigninPage />,
          },
          {
            path: "verification",
            element: <VerificationPage />,
          },
          {
            path: "unauthorized",
            element: <UnauthorizedPage />,
          },
          {
            path: "oauth/callback",
            element: <OauthCallback />,
          },
        ],
      },

      {
        path: "/admin",
        element: (
          // <RequireAdmin>
          <AdminLayout />
          // </RequireAdmin>
        ),
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "inventory",
            element: <ProductManagement />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "addproduct",
            element: <AdminAddProductPage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "addvariant/:id",
            element: <AdminAddVariantPage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "categories",
            element: <CategoryManagement />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "addcategory",
            element: <AddCategoryPage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "addsubcategory",
            element: <AddSubCategoryPage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "orders",
            element: <OrderManagement />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "users",
            element: <UserManagement />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
]);

export default router;
