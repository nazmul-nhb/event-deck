import { z } from 'zod';

const loginSchema = z
	.object({
		email: z
			.string()
			.email({ message: 'Please provide a valid email address!' }),
		password: z.string().trim().min(6, {
			message: 'Password must be at least 6 characters long!',
		}),
	})
	.strict();

const registrationSchema = loginSchema
	.extend({
		name: z
			.string({
				required_error: 'Name is required!',
				message: 'Name is required!',
			})
			.trim(),
		photo_url: z.string().url('Please provide a valid photo URL!').trim(),
	})
	.strict();

export const userValidations = { registrationSchema, loginSchema };
