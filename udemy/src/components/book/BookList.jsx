import React, { useContext } from 'react'
import BookShow from './BookShow'
import BookContext from '../../context/BookContext'


const BookList = () => {
  const { books } = useContext(BookContext);
  const renderedBooks = books.map((book) => {
    return <BookShow key={book.id} book={book}/>
  })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {renderedBooks}
    </div>
  )
}

export default BookList