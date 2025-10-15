import React, { useContext, useState } from 'react'
import BookContext from '../../context/BookContext';
import Button from '../Button';

const BookCreate = () => {
  const [title, setTitle] = useState('');
  const { handleCreateBook } = useContext(BookContext);

  const handleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateBook(title);
    setTitle('');
  }

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 bg-white p-6 rounded-xl shadow"
      >
        <h3 className="text-xl font-bold text-blue-700 mb-2">Create a New Book</h3>
        <div className="flex items-center gap-4 w-full justify-center">
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 w-96"
          />
           <Button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BookCreate