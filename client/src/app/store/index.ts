import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import { authReducer } from '../features/authSlice';
import { toastMiddleware } from '../middlewares/toastMiddleware';

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	auth: authReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware, toastMiddleware),
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
