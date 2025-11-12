import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import mongoose from "mongoose";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import jwtLib from "jsonwebtoken";
import { APIError } from "better-auth/api";
import { publishUserCreated } from "../events/publishers/pub.userCreated";
import { z } from "zod";

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
      await publishUserCreated({
        userId: user.id,
        name: user.name,
        email: user.email,
        data: {
          url: url,
        },
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
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

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Validate email
          if (user.email) {
            const emailResult = z.string().email().safeParse(user.email);
            if (!emailResult.success) {
              throw new APIError("BAD_REQUEST", {
                message: "Invalid email address",
              });
            }
          }

          // Validate name
          if (user.name) {
            const nameResult = z.string().min(3, { message: "Name must be at least 3 characters" }).max(50, { message: "Name must be at most 50 characters" }).safeParse(user.name);

            if (!nameResult.success) {
              throw new APIError("BAD_REQUEST", {
                message: nameResult.error.issues[0].message,
              });
            }
          }

          return {
            data: {
              ...user,
              name: user.name?.trim(),
              email: user.email?.toLowerCase(),
            },
          };
        },
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
      if (ctx.path.startsWith("/sign-in") || ctx.path.startsWith("/sign-up")) {
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
