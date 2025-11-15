import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware } from "better-auth/api";
import jwtLib from "jsonwebtoken";
import mongoose from "mongoose";

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
        defaultValue: "user",
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
          const jwt_token = jwtLib.sign(
            {
              id: user.id,
              email: user.email,
              role: user.role,
            },
            process.env.JWT_KEY!
          );

          try {
            const sessionObj = { jwt: jwt_token };
            const serialized_token = Buffer.from(JSON.stringify(sessionObj)).toString("base64");

            resetBetterAuthCookes(ctx);

            // Set custom cookie with JWT
            ctx.setCookie("session", serialized_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
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
