import { createBrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
]);

export default router;
