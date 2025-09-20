import z from 'zod';

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export { formSchema };