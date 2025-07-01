import type { Prettify } from 'nhb-toolbox/utils/types';
import type { DBItem } from '@/types';

export interface ICredentials {
	email: string;
	password: string;
}

export interface IRegisterUser extends ICredentials {
	name: string;
	photo_url: string;
}

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
