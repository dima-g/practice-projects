import { setTitleFilter, setAuthorFilter, setOnlyFavoriteFilter, selectTitleFilter, selectAuthorFilter, selectOnlyFavoriteFilter, resetFilters } from '../../redux/slices/filterSlice'
import { useDispatch, useSelector } from 'react-redux'
import './Filter.css'

const Filter = () => {

  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoritesFilter = useSelector(selectOnlyFavoriteFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value))
  }

  const handleOnlyFavoriteFilterChange = (e) => {
    dispatch(setOnlyFavoriteFilter())
    // // Dima version
    //dispatch(setOnlyFavoriteFilter(e.target.checked))
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }

  return (
    <div className="app-block filter">
        <div className="filter-row">
          <div className="filter-group">
            <input type="text" placeholder="Filter by title..." value={titleFilter} onChange={handleTitleFilterChange} />
          </div>
          <div className="filter-group">
            <input type="text" placeholder="Filter by author..." value={authorFilter} onChange={handleAuthorFilterChange} />
          </div>
          <div className="filter-group">
            <label>
              <input type="checkbox" checked={onlyFavoritesFilter} onChange={handleOnlyFavoriteFilterChange}/>
              Only Favorite
            </label>
          </div>
          <button type="button" onClick={handleResetFilters}>Reset filters</button>
        </div>
    </div>
  )
}

export default Filter