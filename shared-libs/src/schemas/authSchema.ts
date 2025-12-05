// shared-libs/src/schemas/authSchema.ts
import { z } from "zod/v4";

// Signup schema
export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { error: "Name must be at least 3 characters" })
      .max(50, { error: "Name must be at most 50 characters" }),
    email: z.email({ error: "Invalid email address" }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
        error: "Password must include at least one letter and one number",
      }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match",
  });

// Sign In Schema
export const signinSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(8, { error: "Password is required" }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;