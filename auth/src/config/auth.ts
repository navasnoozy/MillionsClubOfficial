import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import mongoose from "mongoose";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import jwtLib from "jsonwebtoken";
import { publishUserCreated } from "../events/publishers/pub.userCreated";

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

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }, request) => {
      // Better Auth provides the URL and token automatically
      await publishUserCreated({
        userId: user.id,
        name: user.name,
        email: user.name,
        data: {
          url: url,
        },
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true, // Auto sign in after verification
  },

  session: {
    expiresIn: 60 * 60 * 24, // 24 hours
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
      // Check if this is a sign-in or sign-up endpoint
      if (ctx.path.startsWith("/sign-in") || ctx.path.startsWith("/sign-up")) {
        const session = ctx.context.session;

        if (session) {
          // Create JWT token manually using the same payload structure
          const jwtToken = jwtLib.sign(
            {
              id: session.user.id,
              email: session.user.email,
              role: session.user.role || "user",
            },
            process.env.BETTER_AUTH_SECRET!
          );

          // Set JWT token as httpOnly cookie
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
