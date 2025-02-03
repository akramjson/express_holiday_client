import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z.string().optional(),
  role: z.enum(["admin", "client"]).optional(),
  category: z.string().optional(),
  user_id: z.string().optional(),
});

export type userSchemaType = z.infer<typeof UserSchema>;
