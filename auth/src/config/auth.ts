import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware } from "better-auth/api";
import jwtLib from "jsonwebtoken";
import mongoose from "mongoose";
import { cookieOptions } from "./cookieOptions";
import { Session } from "../models/sessionModel";
import { Provider } from "../models/userModel";

if (mongoose.connection.readyState !== 1) {
  throw new Error("Mongoose not connected. Call connectDB() before initializeAuth().");
}

const client = mongoose.connection.getClient();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.AUTH_BASE_URL,
  secret: process.env.BETTER_AUTH_SECRET!,

  trustedOrigins: ["http://localhost:4000", "millionsclub.com", "https://millionsclub.com"],

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: "http://millionsclub.com/api/auth/callback/google",
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "facebook"],
    },
  },

  session: {
    expiresIn: 60 * 60 * 24,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
      },
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: true,
      },
    },
  },

  // Add hooks for post-authentication actions
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/callback")) {
        const user = ctx.context.newSession?.user;

        if (user) {
          const jwt_refresh_token = jwtLib.sign(
            {
              id: user.id,
            },
            process.env.JWT_KEY!,
            { expiresIn: "7d" }
          );

          try {
            await Session.create({ userId: user.id, refreshToken: jwt_refresh_token, lastUsedAt: new Date() });

            resetBetterAuthCookes(ctx);

            // Set custom cookie with JWT
            ctx.setCookie("refresh_token", jwt_refresh_token, {
              ...cookieOptions,
            });
          } catch (error) {
            console.error("Failed to generate JWT:", error);
          }
        }
      }
    }),
  },
});

const resetBetterAuthCookes = (ctx: any) => {
  ctx.setCookie("better-auth.session_token", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
    path: "/",
  });
  ctx.setCookie("better-auth.state", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
    path: "/",
  });
};
