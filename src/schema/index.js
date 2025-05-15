import * as z from 'zod';

export const ContactFormSchema = z
  .object({
    name: z.string().min(4),
    email: z.string().email("Invalid email. Please enter a valid email address"),
    phone: z.string(),
    npwp: z.string(),
    address: z.string(),
  })
  .passthrough();
