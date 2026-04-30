import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "min:2"),
  email: z.string().email("email").optional().or(z.literal("")),
  phone: z.string().min(6, "min:6"),
  service: z.string().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "consent" }),
  }),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
