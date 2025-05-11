import * as z from 'zod';

export const ContactFormSchema = z
  .object({
    name: z.string().min(4),
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'The username must contain only letters, numbers and underscore (_)',
      ),
    phone: z.string(),
    npwp: z.string(),
    address: z.string(),
  })
  .passthrough();
