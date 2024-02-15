import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import createBookWithID from "../../utils/createBookWithID"
import { setError } from "./errorSlice"

const initialState = {
    books: [],
    isLoadingViaAPI: false
}

export const fetchBook = createAsyncThunk(
    'book/fetchBook', 
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url)
            return res.data
        } catch (error) {
            thunkAPI.dispatch(setError(error.message))
            // Option 1
            thunkAPI.rejectWithValue(error)
            // // Option 2
            //throw error
        }
        
    }
)

const bookSlice = createSlice({
    name: 'books',
    initialState, 
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        deleteBook: (state, action) => {
            return {...state, books: state.books.filter(book => book.id !== action.payload)}
        },
        toggleFavorite: (state, action) => {
            state.books.forEach(book => {
                if (book.id === action.payload) book.isFavorite = !book.isFavorite
            })
            //return state.map(book => book.id === action.payload ? {...book, isFavorite: !book.isFavorite} : book)
        }
    },
    // // Option 1
    extraReducers: (builder) => {
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            state.isLoadingViaAPI = false
            if (action?.payload?.title && action?.payload?.author) {
                state.books.push(createBookWithID(action.payload, 'API'))
            }
        })
        builder.addCase(fetchBook.rejected, (state) => {
            state.isLoadingViaAPI = false
        })
        builder.addCase(fetchBook.pending, (state) => {
            state.isLoadingViaAPI = true
        })
    }

    // Option 2 (has been removed)
    // extraReducers: {
    //     [fetchBook.fulfilled]: (state, action) => {
    //         if (action.payload.title && action.payload.author) {
    //             state.push(createBookWithID(action.payload, 'API'))
    //         }
    //     }//, and else there can be fetchbook.rejected or some other variables of createAsyncThunk
    // }
})

export const {addBook, deleteBook, toggleFavorite} = bookSlice.actions

// export const thunkFunction = async (dispatch, getState) => {
//     try {
//         const res = await axios.get('http://localhost:4000/random-book')
//         if (res?.data?.title && res?.data?.author) {
//             dispatch(addBook(createBookWithID(res.data, 'API')))
//         }  
//     } catch (error) {
//         console.error(`Error appeared on fetching random book via API: ${error}`)
//     }
// }

export const selectBooks = store => store.books.books
export const selectIsLoadingViaAPI = store => store.books.isLoadingViaAPI

export default bookSlice.reducer