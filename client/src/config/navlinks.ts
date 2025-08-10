interface NavLinks {
  pages: string[];
  userMenuLinks: { label: string; to: string }[];
}

export const navlinks: NavLinks = {
  pages: ["Products", "Pricing", "Blog"],
  userMenuLinks: [
    { label: "Profile", to: "/profile" },
    { label: "Cart", to: "/cart" },
  ],
};
