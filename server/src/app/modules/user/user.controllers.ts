import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { userServices } from './user.services';

const getCurrentUser = catchAsync(async (req, res) => {
	const user = await userServices.getCurrentUserFromDB(req.user);

	sendResponse(
		res,
		'User',
		'GET',
		user,
		`Successfully retrieved ${user.name}'s profile!`,
	);
});

export const userControllers = { getCurrentUser };
