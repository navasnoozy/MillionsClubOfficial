import { createSlice } from "@reduxjs/toolkit";

interface NavState {
  pages: string[];
  userMenuLinks: { label: string; to: string }[];
}

const initialState: NavState = {
  pages: ["Products", "Pricing", "Blog"],
  userMenuLinks: [
    { label: "Profile", to: "/profile" },
    { label: "Cart", to: "/cart" },
  ],
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {},
});

export default navSlice;
export const navReducer = navSlice.reducer;
