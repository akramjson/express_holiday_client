import { z } from "zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,16}$/;

export const ResetPwdSchema = z.object({
  new_password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not be more than 16 characters")
    .regex(
      passwordRegex,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export type resetPwdSchematype = z.infer<typeof ResetPwdSchema>;
