import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { authServices } from './auth.services';

const registerUser = catchAsync(async (req, res) => {
	const user = await authServices.registerUserInDB(req.body);

	sendResponse(res, 'User', 'POST', user, 'User registered successfully!');
});

const loginUser = catchAsync(async (req, res) => {
	const result = await authServices.loginUser(req.body);

	sendResponse(res, 'User', 'OK', result, 'Login successful!');
});

export const authControllers = { registerUser, loginUser };
