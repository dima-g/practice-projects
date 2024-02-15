import { configureStore } from '@reduxjs/toolkit';
import userSlice, { LS_USER_CONSTANT } from './user.slice';
import cartSlice, { LS_CART_CONSTANT } from './cart.slice';
import { saveState } from './storage';

export const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice
	}
});

store.subscribe(() => {
	saveState({jwt: store.getState().user.jwt}, LS_USER_CONSTANT );
	saveState({items: store.getState().cart.items}, LS_CART_CONSTANT);

});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch