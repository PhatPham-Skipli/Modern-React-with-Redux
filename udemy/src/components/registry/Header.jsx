import React, { useState, useContext } from 'react'
import SearchInput from './SearchInput'
import { useNavigate } from 'react-router-dom'
import RegistryContext from '../../context/RegistryContext'

const Header = () => {
  const [term, setTerm] = useState('')
  const navigate = useNavigate()
  const { handleSearch } = useContext(RegistryContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(term)
    navigate(`/registry/search?term=${term}`)
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="flex items-center px-8 py-4">
        <span className="font-bold text-3xl mr-8 tracking-wide text-black cursor-pointer" onClick={() => navigate('/registry')}>npm</span>
        <SearchInput term={term} setTerm={setTerm} onSubmit={handleSubmit} />
        <div className="flex items-center ml-8 gap-4">
          <button className="border px-6 h-12 rounded-none text-lg font-medium">Sign Up</button>
          <button className="text-lg font-medium">Sign In</button>
        </div>
      </div>
    </header>
  )
}

export default Header