import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string({ error: "Name is required" }).min(3, { error: "Name must be at least 3 characters" }).max(50, { error: "Name must be at most 50 characters" }),

    email: z.email({ error: "Invalid email address" }),

    password: z
      .string({ error: "Password is required" })
      .min(8, { error: "Password must be at least 8 characters" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must include at least one letter and one number",
      }),

    confirmPassword: z.string({ error: "Confirm Password is required" }).min(8, { error: "Confirm Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// Sign In Schema
export const signinSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string({ error: "Password is required" }).min(8, { error: "Password is required" }),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
