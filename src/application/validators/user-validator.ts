import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3, 'name is required.'),
  email: z.string().email('email is required and must be valid.'),
  password: z
    .string()
    .min(6, 'the password should have at least 6 characters.'),
});

export const LoginSchema = z.object({
  email: z.string().email('email must be valid.'),
  password: z.string().min(1, 'password is required.'),
});
