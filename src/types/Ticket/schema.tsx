import { z } from "zod";

const InputSchema = z.object({
  label: z.string(),
  type: z.string(),
  required: z.boolean(),
  sub_category: z.string(),
  input_id: z.number(),
  array: z.nullable(z.any()),
});

const ResponseSchema = z.object({
  input_id: z.number(),
  response: z.string(),
  ticket_id: z.number(),
  input: InputSchema,
});

const FileSchema = z.object({
  ticket_id: z.number(),
  original_filename: z.string(),
  path: z.string(),
});

const TicketSchema = z.object({
  ticket_id: z.number(),
  user_id: z.number(),
  sub_category: z.string(),
  category: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  responses: z.array(ResponseSchema),
  files: z.array(FileSchema),
});

export type ticketSchematype = z.infer<typeof TicketSchema>;
export { TicketSchema };
