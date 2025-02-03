import { z } from "zod";

export const ForgetPwdSchema = z.object({
  email: z.string().email().optional(),
});

export type forgetPwdSchematype = z.infer<typeof ForgetPwdSchema>;
