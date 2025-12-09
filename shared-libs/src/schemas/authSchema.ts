import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string({ error: "Name is required" }).min(3, { error: "Name must be at least 3 characters" }).max(50, { error: "Name must be at most 50 characters" }),

    email: z.email({
      error: (issue) => {
        if (!issue.input || issue.input === "") return "Email is required";
        return "Invalid email address";
      },
    }),

    status: z
      .enum(["active", "inactive", "blocked"], {
        error: "Status must be one of: active, inactive, blocked",
      })
      .optional(),

    password: z
      .string({ error: "Password is required" })
      .min(8, { error: "Password must be at least 8 characters" })
      .regex(/^(?:(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+)?$/, {
        error: "Password must include at least one letter and one number",
      }),

    confirmPassword: z.string({ error: "Confirm Password is required" }).min(8, { error: "Confirm Password must be at least 8 characters" }),

    role: z.enum(["customer", "admin", "moderator"], { error: "Invalid role" }).optional(),

    emailVerified: z
      .union([z.boolean(), z.string()])
      .refine((val) => val === true || val === false || val === "true" || val === "false", {
        error: "Invalid emailVerified status. Allowed values are: boolean (true, false),string ('true', 'false')",
      })
      .transform((val) => val === true || val === "true")
      .optional(),

    isDeleted: z
      .union([z.boolean(), z.string()])
      .refine((val) => val === true || val === false || val === "true" || val === "false", {
        error: "Invalid isDeleted status. Allowed values are: boolean (true, false),string ('true', 'false')",
      })
      .transform((val) => val === true || val === "true")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .strict();

// Sign In Schema
export const signinSchema = z
  .object({
    email: z.email({
      error: (issue) => {
        if (!issue.input || issue.input === "") return "Email is required";
        return "Invalid email address";
      },
    }),
    password: z.string({ error: "Password is required" }).min(8, { error: "Password is required" }),
  })
  .strict();

export const createUserSchema = signupSchema
  .required({
    name: true,
    email: true,
    emailVerified: true,
    password: true,
    confirmPassword: true,
    role: true,
  })
  .omit({
    isDeleted: true,
  })
  .strict();

export const updateUserSchema = signupSchema.omit({ password: true, confirmPassword: true }).partial().strict();

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
