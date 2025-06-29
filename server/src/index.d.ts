import type { DecodedUser } from './app/types/interfaces';

declare global {
	namespace Express {
		interface Request {
			user?: DecodedUser;
		}
	}
}
