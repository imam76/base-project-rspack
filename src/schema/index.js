import * as z from 'zod';

export const ContactFormSchema = z
  .object({
    name: z.string().min(4),
    email: z
      .string()
      .email('Invalid email. Please enter a valid email address'),
    phone: z.string(),
    npwp: z.string(),
    address: z.string(),
  })
  .passthrough();

// Login form schema
export const LoginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
