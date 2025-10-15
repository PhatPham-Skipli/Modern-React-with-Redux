import React from 'react';
import { CloseIcon } from '../../svg/Icon';

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-96 p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
        >
            
            <CloseIcon />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Modal Title</h2>
        <p className="text-gray-600 mb-6">
          This is a beautiful modal. You can add any content here, such as text, images, or forms.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;