import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';

export interface CartItem {
    id: number,
    count: number
}

export interface CartState {
    items: CartItem[],
}

export interface CartPersistentState {
    items: CartItem[],
}

export const LS_CART_CONSTANT = 'cartData';

const initialState: CartState = loadState<CartState>(LS_CART_CONSTANT) ?? {
	items: []
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		cleanCart: (state) => {
			state.items = [];
		},
		removeAll: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(i => i.id !== action.payload); 
		},
		removeItem: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);
			if (!existed) {
				return;
			}
			if (existed.count === 1) {
				state.items = state.items.filter(i => i.id !== action.payload);
			} else {
				state.items.map((item) => {
					if (item.id === action.payload) {
						item.count -= 1;
					}
					return item;
				});
				return;
			}
		},
		addItem: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);
			if (!existed) {
				state.items.push({ id: action.payload, count: 1 });
				return;
			}
			state.items.map((item) => {
				if (item.id === action.payload) {
					item.count += 1;
				}
				return item;
			});

		}
	}
	// extraReducers: (builder) => {
		
	// }
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;