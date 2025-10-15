import { useState } from 'react'
import Button from '../Button';

const BookEdit = ({ book, onCancel, onSubmit }) => {
  const [title, setTitle] = useState(book.title);

  const handleChange = (e) => setTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full mt-6">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        className="px-4 py-2 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 w-64"
      />
      <div className="flex gap-2">
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default BookEdit