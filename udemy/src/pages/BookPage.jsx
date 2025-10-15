import { useContext, useEffect } from 'react';
import BookCreate from '../components/book/BookCreate'
import BookList from '../components/book/BookList'
import BookContext from '../context/BookContext'


const BookPage = () => {
    const { fetchBooks } = useContext(BookContext);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <BookCreate />
            <BookList />
        </div>
    )
}

export default BookPage