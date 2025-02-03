import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
  client_id: z.string().optional(),
  scope: z.string().optional(),
  client_secret: z.string().optional(),
  grant_type: z.string(),
});

export type loginSchemaType = z.infer<typeof LoginSchema>;
