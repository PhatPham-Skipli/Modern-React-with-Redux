import React from 'react'
import { FiSearch, FiMic } from 'react-icons/fi'

const SearchInput = ({ term, setTerm, onSubmit }) => {
  return (
    <form className="flex-1 flex items-center max-w-xl mx-auto" onSubmit={onSubmit}>
      <div className="flex items-center bg-gray-100 rounded-full w-full h-10 px-4 border border-gray-300">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="bg-transparent outline-none flex-1 text-base text-gray-900 placeholder-gray-500"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit" className="ml-2">
          <FiSearch className="text-xl text-gray-700" />
        </button>
      </div>
    </form>
  )
}

export default SearchInput