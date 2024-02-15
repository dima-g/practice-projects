import { useSelector, useDispatch } from 'react-redux'
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs'
import { selectBooks, deleteBook, toggleFavorite } from '../../redux/slices/booksSlice'
//import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators'
import { selectTitleFilter, selectAuthorFilter, selectOnlyFavoriteFilter } from '../../redux/slices/filterSlice'
import './BookList.css'

const BookList = () => {
    //const books = useSelector(store => store.books)
    const books = useSelector(selectBooks)
    const titleFilter = useSelector(selectTitleFilter)
    const authorFilter = useSelector(selectAuthorFilter)
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)
    const dispatch = useDispatch()

    const filteredBooks = books.filter(book => {
        const matchesTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase())
        const matchesAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase())
        const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
        return matchesTitle && matchesAuthor && matchesFavorite

        // // Dima version
        // const favoritesChecked = book.isFavorite
        // return onlyFavoriteFilter ? matchesTitle && matchesAuthor && favoritesChecked : matchesTitle && matchesAuthor
    })

    const handleDelete = (id) => {
        dispatch(deleteBook(id))
    }

    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id))
    }

    const hightlightMatchingText = (text, filterText) => {
        const regex = new RegExp(`(${filterText})`, "gi")
        if (!filterText) return text
        return text.split(regex).map((substring, i) => {
            if (substring.toLowerCase() === filterText.toLowerCase()) {
                return <span key={i} className='highlight'>{substring}</span>
            }
            return substring
        })
    }

    return (
    <div className="app-block book-list">
        <h2>Your book list</h2>
        {
            books.length ? 
                (
                    <ul>
                        {filteredBooks.map((book, i) => (
                            <li key={book.id}>
                                <div className='book-info'>
                                    {++i}. {hightlightMatchingText(book.title, titleFilter)} by <strong>{hightlightMatchingText(book.author, authorFilter)}</strong> ({book.source})
                                </div>
                                <span onClick={() => handleToggleFavorite(book.id)}>
                                    {
                                        book.isFavorite 
                                            ? <BsBookmarkStarFill className="star-icon" /> 
                                            : <BsBookmarkStar className="star-icon" /> 
                                    }
                                </span>
                                
                                <button className='book-actions' onClick={() => handleDelete(book.id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No books available</p>
                )
        }
    </div>
  )
}

export default BookList