import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: '',
    author: '',
    onlyFavorite: false
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            // You can return new state as usually
            return {...state, title: action.payload}

            // // Or you can mutate the object/array thanks to Immer library
            // state.title = action.payload
        },
        setAuthorFilter: (state, action) => {
            state.author = action.payload
        },
        setOnlyFavoriteFilter: (state) => {
            state.onlyFavorite = !state.onlyFavorite
            // //Dima version
            //state.onlyFavorite = action.payload
        },
        resetFilters: () => {
            return initialState
        }

    }
})

export const { setTitleFilter, setAuthorFilter, setOnlyFavoriteFilter, resetFilters } = filterSlice.actions

export const selectTitleFilter = (store) => store.filters.title
export const selectAuthorFilter = (store) => store.filters.author
export const selectOnlyFavoriteFilter = (store) => store.filters.onlyFavorite

export default filterSlice.reducer