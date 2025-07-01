import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	photo_url: z.string().url('Please enter a valid photo URL'),
});

export const eventSchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters'),
	event_date: z.string().min(1, 'Date and time is required'),
	location: z.string().min(3, 'Location must be at least 3 characters'),
	description: z.string().min(10, 'Description must be at least 10 characters'),
});
