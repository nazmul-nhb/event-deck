import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';
import { createToken, verifyPassword } from '../../utilities/authUtilities';
import { User } from '../user/user.model';
import type { ILoginCredentials, IUser } from '../user/user.types';

const registerUserInDB = async (payload: IUser) => {
	const newUser = await User.create(payload);

	const { _id, name, email, photo_url } = newUser.toObject();

	return { _id, name, email, photo_url };
};

const loginUser = async (payload: ILoginCredentials) => {
	const user = await User.validateUser(payload.email);

	const passwordMatched = await verifyPassword(
		payload?.password,
		user?.password,
	);

	if (!passwordMatched) {
		throw new ErrorWithStatus(
			'Authorization Error',
			`Invalid credentials!`,
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	const token = createToken({ email: user.email });

	return { token };
};

export const authServices = { registerUserInDB, loginUser };
