//src/config/adminLinks.ts

interface AdminLinks {
  pages: { label: string; to: string }[];
}

export const adminLinks: AdminLinks = {
  pages: [
    { label: "Dashboard", to: "/admin" },
    { label: "Orders", to: "/admin/ordermanagement" },
    { label: "Products", to: "/admin/productmanagement" },
    { label: "Categories", to: "/admin/categorymanagement" },
    { label: "Users", to: "/admin/users" },
  ],
};
