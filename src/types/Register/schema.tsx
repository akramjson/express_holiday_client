import { z } from "zod";

// Regex for Algerian phone number with +213, starting with 7, 6, or 5, followed by 9 digits
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,16}$/;

export const phoneNumberRegex = /^\+213(5|6|7)\d{9}$/;

export const RegisterSchema = z
  .object({
    first_name: z
      .string()
      .min(4, "First name must be at least 4 characters")
      .max(20, "First name must not be more than 20 characters"),
    last_name: z
      .string()
      .min(4, "Last name must be at least 4 characters")
      .max(20, "Last name must not be more than 20 characters"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must not be more than 16 characters")
      .regex(
        passwordRegex,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    role: z.enum(["admin", "client"]).optional(),
    phone_number: z.string().optional(),
    category: z.string().optional(),
    confirm_password: z.string(),
  })
  .partial()
  .refine((data) => data.password === data.confirm_password, {
    message: "Password does not match",
    path: ["confirm_password"],
  });

export type registerSchemaType = z.infer<typeof RegisterSchema>;
