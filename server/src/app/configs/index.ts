import dotenv from 'dotenv';
import type { LooseLiteral } from 'nhb-toolbox/utils/types';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
	port: process.env.PORT || 4242,
	NODE_ENV: process.env.NODE_ENV as LooseLiteral<
		'development' | 'production'
	>,
	mongoUri: process.env.MONGO_URI as string,
	saltRounds: Number(process.env.SALT_ROUNDS),
	accessSecret: process.env.JWT_ACCESS_SECRET as string,
};
