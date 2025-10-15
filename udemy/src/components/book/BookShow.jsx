import React, { useContext, useState } from 'react';
import BookEdit from './BookEdit';
import BookContext from '../../context/BookContext';
import { EditIcon, DeleteIcon } from '../../svg/Icon';
import Button from '../Button';

const BookShow = ({ book }) => {
  const [showEdit, setShowEdit] = useState(false);
  const { handleDeleteBook, handleUpdateBook } = useContext(BookContext);

  const handleDelete = () => {
    handleDeleteBook(book.id);
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };

  const handleCancelEdit = () => {
    setShowEdit(false);
  };

  const handleSubmitEdit = (newTitle) => {
    handleUpdateBook(book.id, newTitle);
    setShowEdit(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[260px] hover:shadow-xl transition-all">
      <div className="w-full flex justify-end gap-3 mb-2">
        <Button
          onClick={handleEditClick}
          title="Edit"
          className="w-9 h-9 bg-blue-500 border border-white text-white rounded-full flex items-center justify-center shadow hover:bg-blue-600 hover:scale-110 transition"
        >
          <EditIcon />
        </Button>
        <Button
          onClick={handleDelete}
          title="Delete"
          className="w-9 h-9 bg-red-500 border border-white text-white rounded-full flex items-center justify-center shadow hover:bg-red-600 hover:scale-110 transition"
        >
          <DeleteIcon />
        </Button>
      </div>
      {showEdit ? (
        <BookEdit book={book} onSubmit={handleSubmitEdit} onCancel={handleCancelEdit} />
      ) : (
        <>
          <img
            src={`https://picsum.photos/seed/${book.id}/300/200`}
            alt="book"
            className="w-40 h-40 object-cover rounded-lg mb-4 shadow"
          />
          <h3 className="text-lg font-semibold text-blue-700 break-words text-center">{book.title}</h3>
        </>
      )}
    </div>
  );
};

export default BookShow;