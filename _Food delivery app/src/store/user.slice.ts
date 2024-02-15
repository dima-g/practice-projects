import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginResponse } from '../interfaces/auth.interface';
import { loadState } from './storage';
import { RootState } from './store';
import { Profile } from '../interfaces/user.interface';

export interface UserState {
    jwt: string | null,
    loginErrorMessage?: string,
    registerErrorMessage?: string,
    profile?: Profile
}

export interface UserPersistentState {
    jwt: string | null,
}

export const LS_USER_CONSTANT = 'userData';

export const login = createAsyncThunk('user/login', async (params: { email: string, password: string }) => {
	try {
		const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {email: params.email, password: params.password});
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data.message);
		}
	}
});

export const register = createAsyncThunk('user/register', async (params: { email: string, password: string, name: string }) => {
	try {
		const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {email: params.email, password: params.password, name: params.name});
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data.message);
		}
	}
});

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>('user/userData', async (_, thunkAPI) => {
	//const { jwt } = (thunkAPI.getState() as RootState).user;

	const config = {
		headers: {
			Authorization: `Bearer ${thunkAPI.getState().user.jwt}`
		}
	};
	const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, config);
	console.log(data);
	return data;
});

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(LS_USER_CONSTANT)?.jwt ?? null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		removeJWT: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;		
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.profile = action.payload;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;		
		});
	}
});

export default userSlice.reducer;

export const userActions = userSlice.actions;