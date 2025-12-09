import { z } from "zod";

export const ticketCreateSchema = z.object({
  subject: z.string().min(3).max(120),
  category: z.enum(["ban", "bug", "vip", "tech", "other"]),
  body: z.string().min(5).max(4000)
});

export const ticketReplySchema = z.object({
  body: z.string().min(1).max(4000)
});

export const ticketUpdateSchema = z.object({
  status: z.enum(["open", "waiting", "closed"]).optional(),
  priority: z.enum(["low", "normal", "high"]).optional()
});

export const linkRequestSchema = z.object({
  dummy: z.string().optional()
});

export const linkClaimSchema = z.object({
  uuid: z.string().min(3),
  name: z.string().min(3),
  code: z.string().length(6)
});

export const rconSchema = z.object({
  command: z.string().min(1).max(200)
});
