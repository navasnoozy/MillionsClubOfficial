//client/src/features/auth/lib/Oauth-client.ts
import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient({
  baseURL: "http://millionsclub.com/api/auth", // Your auth server URL
});
