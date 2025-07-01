import type { TRootState } from '@/app/store';
import { configs } from '@/configs/site_configs';
import type { ILoggedInState } from '@/types/user.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
	getFromLocalStorage,
	removeFromLocalStorage,
	saveToLocalStorage,
} from 'nhb-toolbox';

const initialState: ILoggedInState = {
	user: null,
	token: getFromLocalStorage(configs.token_key),
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<ILoggedInState['token']>) => {
			state.token = action.payload;

			saveToLocalStorage(configs.token_key, action.payload);
		},

		setCurrentUser: (state, action: PayloadAction<ILoggedInState['user']>) => {
			state.user = action.payload;
		},

		logOut: (state) => {
			state.user = null;
			state.token = null;

			removeFromLocalStorage(configs.token_key);
		},
	},
});

export const { setToken, setCurrentUser, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectUser = (state: TRootState) => state.auth.user;
export const selectToken = (state: TRootState) => state.auth.token;
