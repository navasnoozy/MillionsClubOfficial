import { createSlice } from "@reduxjs/toolkit";

interface NavState {
  pages: string[];
  settings: string[];
}

const initialState: NavState = {
  pages: ["Products", "Pricing", "Blog"],
  settings: ["Profile", "Account", "Dashboard", "Logout"],
};

const navSlice = createSlice ({
     name :'nav',
     initialState,
     reducers : {}
});

export default navSlice;
export const navReducer = navSlice.reducer