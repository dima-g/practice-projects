import { configureStore } from "@reduxjs/toolkit"
//import booksReducer from "./books/reducer"
import filterReducer from "./slices/filterSlice"
import booksReducer from "./slices/booksSlice"
import errorReducer from "./slices/errorSlice"

const store = configureStore({
    reducer: {
        books: booksReducer,
        filters: filterReducer,
        error: errorReducer
    },
})

export default store