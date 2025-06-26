import { createBrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import Signup from "./auth/signup";
import Layout from "./layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

export default router;
