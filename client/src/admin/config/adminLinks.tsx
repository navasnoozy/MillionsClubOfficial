//src/config/adminLinks.ts

import type { ReactNode } from "react";
import { BarChart, ReceiptLong, ShoppingBag, ContactPage, Category, SettingsApplications } from "@mui/icons-material";

interface AdminLinks {
  pages: { label: string; to: string; icon: ReactNode }[];
}

export const adminLinks: AdminLinks = {
  pages: [
    { label: "Dashboard", to: "/admin", icon: <BarChart /> },
    { label: "Orders", to: "/admin/ordermanagement", icon: <ReceiptLong /> },
    { label: "Products", to: "/admin/productmanagement", icon: <ShoppingBag /> },
    { label: "Users", to: "/admin/users", icon: <ContactPage /> },
    { label: "Categories", to: "/admin/categorymanagement", icon: <Category /> },
    { label: "Settings", to: "/admin/settings", icon: <SettingsApplications /> },
  ],
};
