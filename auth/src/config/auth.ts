import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware } from "better-auth/api";
import { jwt } from "better-auth/plugins";
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

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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

  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        },
      },
    }),
  ],

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-in")) {
        const session = ctx.context.session;

        if (session) {
          const jwtToken = jwtLib.sign(
            {
              id: session.user.id,
              email: session.user.email,
              role: session.user.role || "user",
            },
            process.env.BETTER_AUTH_SECRET!
          );

          ctx.setCookie("jwt", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          });
        }
      }
      return ctx;
    }),
  },
});
