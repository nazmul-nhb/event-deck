import type { TRootState } from '@/app/store';
import type { IErrorResponse, IGenericResponse } from '@/types/server.types';
import type { Dispatch, Middleware, UnknownAction } from '@reduxjs/toolkit';
import { isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface FulfilledMeta {
	arg: {
		endpointName?: string;
	};
}

interface RejectedMeta {
	arg: {
		endpointName?: string;
	};
}

interface FulfilledAction {
	type: string;
	payload: IGenericResponse;
	meta: FulfilledMeta;
}

interface RejectedAction {
	type: string;
	payload: IErrorResponse;
	meta: RejectedMeta;
}

const IGNORED_ENDPOINTS: string[] = [];

export const toastMiddleware: Middleware<unknown, unknown, Dispatch<UnknownAction>> =
	(store) => (next) => (action: unknown) => {
		try {
			if (isFulfilled(action)) {
				const { payload, meta } = action as FulfilledAction;
				const endpoint = meta.arg?.endpointName;
				const isMutation = action.type.includes('executeMutation');

				if (isMutation && endpoint && !IGNORED_ENDPOINTS.includes(endpoint)) {
					toast.success(payload?.message ?? 'Action completed successfully.');
				}
			}

			if (isRejectedWithValue(action)) {
				const { payload, meta } = action as RejectedAction;
				const endpoint = meta.arg?.endpointName;
				const token = (store.getState() as TRootState)?.auth?.token;

				if (token && endpoint && !IGNORED_ENDPOINTS.includes(endpoint)) {
					const fallback = 'Something Went Wrong!';
					const errMsg =
						payload?.message || payload?.errors?.[0]?.message || fallback;

					toast.error(errMsg);
				}
			}
		} catch {
			console.error('Something Went Wrong!');
		}

		return next(action as UnknownAction);
	};
