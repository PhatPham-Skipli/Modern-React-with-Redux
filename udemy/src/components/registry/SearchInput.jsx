import React from 'react'
import { FiSearch } from 'react-icons/fi'

const SearchInput = ({ term, setTerm, onSubmit }) => {
  return (
    <form className="flex-1 flex items-center" onSubmit={onSubmit}>
      <div className="flex items-center bg-gray-100 rounded-sm w-full h-12 px-4">
        <FiSearch className="text-xl text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Search packages"
          className="bg-transparent outline-none flex-1 text-lg text-gray-700"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="ml-2 h-12 px-8 bg-black text-white font-semibold rounded-none text-lg"
      >
        Search
      </button>
    </form>
  )
}

export default SearchInput