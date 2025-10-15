import { createContext, useCallback, useState } from "react";
import { createBook, deleteBook, getBooks, updateBook } from "../services/BookService";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async () => {
        try {
            const response = await getBooks();
            setBooks(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleDeleteBook = async (id) => {
        try {
            const response = await deleteBook(id);
            if (response) {
                const updatedBooks = books.filter((book) => book.id !== id);
                setBooks(updatedBooks);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateBook = async (title) => {
        try {
            const response = await createBook({ title });
            const newBook = [
                ...books,
                response.data
            ]
            setBooks(newBook);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateBook = async (id, newTitle) => {
        try {
            const response = await updateBook(id, { title: newTitle });
            const updatedBooks = books.map((book) => {
                if (book.id === id) {
                    return { ...book, ...response.data };
                }
                return book;
            });
            setBooks(updatedBooks);
        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        books,
        fetchBooks,
        handleDeleteBook,
        handleCreateBook,
        handleUpdateBook
    };

    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    );
}

export default BookContext;