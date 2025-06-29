import type { DecodedUser } from '../../types/interfaces';
import { User } from './user.model';
import type { IPlainUser } from './user.types';

const getCurrentUserFromDB = async (client?: DecodedUser) => {
	const user = await User.validateUser(client?.email);

	const { password: _, __v, ...userInfo } = user.toObject<IPlainUser>();

	return userInfo;
};
export const userServices = { getCurrentUserFromDB };
