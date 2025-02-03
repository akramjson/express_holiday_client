import { z } from "zod";

const CategoriesSchema = z.object({
  category_name: z.string(),
});

export type catsSchematype = z.infer<typeof CategoriesSchema>;
