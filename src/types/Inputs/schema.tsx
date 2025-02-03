import { z } from "zod";

// Define InputSchema lazily to allow self-reference
const InputSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    label: z.string(),
    type: z.enum(["text", "select", "textarea", "array"]),
    required: z.boolean(),
    sub_category: z.string(),
    input_id: z.number(),
    array: z.array(InputSchema).optional() || z.number().optional(),
  })
);

export type inputSchematype = z.infer<typeof InputSchema>;
