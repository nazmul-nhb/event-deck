import type { DBItem } from '@/types';
import type { Prettify } from 'nhb-toolbox/utils/types';
import { z } from 'zod';
import type { loginSchema, registerSchema } from '@/schema';

export type TCredentials = z.infer<typeof loginSchema>;

export type TRegisterUser = z.infer<typeof registerSchema>;

export interface INewUser {
	_id: string;
	name: string;
	email: string;
	photo_url: string;
}

export type TSingleUser = Prettify<DBItem & INewUser>;

export interface ILoggedInState {
	user: TSingleUser | null;
	token: string | null;
}
