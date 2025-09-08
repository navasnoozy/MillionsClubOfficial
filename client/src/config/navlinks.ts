//src/config/navlinks.ts

interface NavLinks {
  pages: string[];
  userMenuLinks: { label: string; to: string }[];
}

export const navlinks: NavLinks = {
  pages: ["OFFERS", "NEW ARRIVALS", "COUPONS"],
  userMenuLinks: [
    { label: "Profile", to: "/profile" },
    { label: "Cart", to: "/cart" },
  ],
};
