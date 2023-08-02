import './Search.css'

const Search = ({ size, searchText, searchingWithId, ...rest }) => {
  return <input className={size} type="text" {...rest} value={searchText}  onChange={searchingWithId}/>
}

export default Search
