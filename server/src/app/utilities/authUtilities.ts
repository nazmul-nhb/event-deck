import { createHmac, randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import configs from '../configs';
import { STATUS_CODES } from '../constants';

// ! ========== PASSWORD UTILS ========== //

import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

/**
 * * Hash a plain text password securely.
 * @param password The plain text password to hash
 * @returns The combined salt and hash string (format: salt:hash)
 */
export async function hashPassword(password: string) {
	const salt = randomBytes(16).toString('hex');
	const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
	return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * * Compare a plain password against a stored salt:hash.
 * @param password The plain text password
 * @param storedHash The stored value from DB (salt:hash)
 * @returns True if the password matches, false otherwise
 */
export async function verifyPassword(password: string, storedHash: string) {
	const [salt, key] = storedHash.split(':');
	const derived = (await scryptAsync(password, salt, 64)) as Buffer;
	const keyBuffer = Buffer.from(key, 'hex');

	return timingSafeEqual(derived, keyBuffer);
}

// ! ======= TOKEN UTILITIES ======= //

/**
 * * Encode a JS object into a base64url string.
 * @param obj The object to encode
 */
function base64urlEncode(obj: Record<string, unknown>): string {
	const json = JSON.stringify(obj);
	return Buffer.from(json).toString('base64url');
}

/**
 * * Decode a base64url string into a JS object.
 * @param str The base64url string
 */
function base64urlDecode<T>(str: string): T {
	const json = Buffer.from(str, 'base64url').toString();
	return JSON.parse(json);
}

/**
 * * Sign a payload object and return a token.
 * @param payload The object to encode and sign
 */
export function createToken<T extends Record<string, unknown>>(
	payload: T,
): string {
	const encoded = base64urlEncode(payload);
	const signature = createHmac('sha256', configs.tokenSecret)
		.update(encoded)
		.digest('base64url');
	return `${encoded}.${signature}`;
}

/**
 * * Verify the token and decode the payload if valid.
 * @param token The signed token
 */
export function verifyToken<T>(token: string | undefined): T {
	if (!token) {
		throw new ErrorWithStatus(
			'Authorization Error',
			'Invalid token!',
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	const [encoded, signature] = token.split('.');
	if (!encoded || !signature) {
		throw new ErrorWithStatus(
			'Authorization Error',
			'Invalid token!',
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	const expectedSignature = createHmac('sha256', configs.tokenSecret)
		.update(encoded)
		.digest('base64url');

	const isValid = timingSafeEqual(
		Buffer.from(signature),
		Buffer.from(expectedSignature),
	);

	if (isValid) {
		return base64urlDecode<T>(encoded);
	}

	throw new ErrorWithStatus(
		'Authorization Error',
		'Your token is invalid or expired!',
		STATUS_CODES.UNAUTHORIZED,
		'auth',
	);
}
