import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './general.css'

function SearchBar({ title, setTitle }) {
  const inputRef = useRef(null)

  const handleInput = (event) => {
    setTitle(event.target.value)
  }

  const handleFocus = () => {
    inputRef.current.focus()
  }

  return (
    <div className="searchbar-pill" onClick={handleFocus}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={handleInput}
        className="search-input"
        placeholder="Search Movies"
      />
    </div>
  )
}

export default SearchBar
