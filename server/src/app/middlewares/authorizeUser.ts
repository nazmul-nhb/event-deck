import { User } from '../modules/user/user.model';
import type { DecodedUser } from '../types/interfaces';
import { verifyToken } from '../utilities/authUtilities';
import catchAsync from '../utilities/catchAsync';

const authorizeUser = () => {
	return catchAsync(async (req, _res, next) => {
		const token = req.headers.authorization?.split(' ')[1];

		const decoded = verifyToken<DecodedUser>(token);

		await User.validateUser(decoded.email);

		req.user = decoded;

		next();
	});
};

export default authorizeUser;
