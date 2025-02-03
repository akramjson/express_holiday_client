import { z } from "zod";

const TicketSchema = z.object({
  category: z.string(),
  ticket_id: z.number(),
  created_at: z.date(),
  user_id: z.number(),
  sub_category: z.string(),
  status: z.enum(["Closed", "Open", "In Progress"]),
  updated_at: z.date(),
});

export type ticketSchematype = z.infer<typeof TicketSchema>;
