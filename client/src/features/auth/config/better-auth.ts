import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://millionsclub.local.com/", // The base URL of your auth server
});
