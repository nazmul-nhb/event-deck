import type { Document, Model, Types } from 'mongoose';

export interface IUser extends ILoginCredentials {
	name: string;
	photo_url: string;
}

export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface IPlainUser extends IUser {
	_id: Types.ObjectId;
	created_at: string;
	updated_at: string;
}

export interface IUserDoc extends IUser, Document {
	_id: Types.ObjectId;
}

export interface IUserModel extends Model<IUserDoc> {
	validateUser(email?: string): Promise<IUserDoc>;
}

export interface ICurrentUser extends Omit<IUser, 'password'> {
	_id: Types.ObjectId;
	created_at: string;
	updated_at: string;
}
