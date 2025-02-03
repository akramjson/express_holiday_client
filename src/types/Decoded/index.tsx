import { z } from "zod";

const DecodedTokenSchema = z.object({
  exp: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.string(),
  sub: z.string(),
});

export type decodedTokenSchemaType = z.infer<typeof DecodedTokenSchema>;
