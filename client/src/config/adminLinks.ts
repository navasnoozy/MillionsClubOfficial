interface AdminLinks {
  pages: { label: string; to: string }[];
}

export const adminLinks: AdminLinks = {
  pages: [
    { label: "Dashboard", to: "/admin/dashboard" },
    { label: "Orders", to: "/admin/ordermanagement" },
    { label: "Products", to: "/admin/productmanagement" },
    { label: "Categories", to: "/admin/categories" },
    { label: "Users", to: "/admin/users" },
  ],
};
