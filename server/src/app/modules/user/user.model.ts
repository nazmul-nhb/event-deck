import { Schema, model } from 'mongoose';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';
import { hashPassword } from '../../utilities/authUtilities';
import type { IUserDoc, IUserModel } from './user.types';

const userSchema = new Schema<IUserDoc>(
	{
		name: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		photo_url: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			select: false,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		versionKey: false,
	},
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await hashPassword(this.password);
	next();
});

userSchema.statics.validateUser = async function (email?: string) {
	if (!email) {
		throw new ErrorWithStatus(
			'Authentication Error',
			'Please provide a valid email!',
			STATUS_CODES.BAD_REQUEST,
			'user',
		);
	}

	const user: IUserDoc = await this.findOne({ email }).select('+password');

	if (!user) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No user found with email: ${email}!`,
			STATUS_CODES.NOT_FOUND,
			'user',
		);
	}

	return user;
};

export const User = model<IUserDoc, IUserModel>('User', userSchema);
