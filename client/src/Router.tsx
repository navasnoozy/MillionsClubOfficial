// router.tsx
import { createBrowserRouter } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import SigninPage from "./features/auth/pages/SigninPage";
import SignupPage from "./features/auth/pages/SignupPage";
import AddCategoryPage from "./features/categories/pages/AddCategoryPage";
import AddSubCategoryPage from "./features/categories/pages/AddSubCategoryPage";
import CategoryManagement from "./features/categories/pages/CategoryManagement";
import OrderManagement from "./features/order/pages/OrderManagement";
import AdminAddProductPage from "./features/products/admin/pages/AdminAddProductPage";
import AdminAddVariantPage from "./features/products/admin/pages/AdminAddVariantPage";
import ProductManagement from "./features/products/admin/pages/ProductManagement";
import AdminLayout from "./layouts/AdminLayout";
import Layout from "./layouts/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import RequireAdmin from "./components/admin/RequireAdmin";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import VerificationPage from "./features/auth/pages/VerificationPage";
import PersistLogin from "./components/PersistLogin";
import OauthCallback from "./features/auth/components/OauthCallback";

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
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
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
            element: <AdminAddProductPage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "addvariant/:id",
            element: <AdminAddVariantPage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "categorymanagement",
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
            path: "ordermanagement",
            element: <OrderManagement />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
]);

export default router;
