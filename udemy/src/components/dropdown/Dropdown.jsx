import React, { useEffect, useRef, useState } from 'react';

const Dropdown = ({ options, selection, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divEl.current && !divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const renderedOptions = options.map((option) => (
    <div
      onClick={() => handleOptionSelect(option)}
      key={option.value}
      className="hover:bg-sky-100 cursor-pointer p-2 text-gray-700 transition-colors duration-200"
    >
      {option.label}
    </div>
  ));

  const selectedLabel = selection ? selection.label : 'Select Color';

  return (
    <div ref={divEl} className="relative w-64">
      <div
        className="p-3 border rounded-lg shadow bg-white cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-all duration-300"
        onClick={toggleDropdown}
      >
        <span className="text-gray-700 font-medium">{selectedLabel}</span>
        <span className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full border rounded-lg shadow bg-white mt-1 max-h-60 overflow-y-auto z-10">
          {renderedOptions}
        </div>
      )}
    </div>
  );
};

export default Dropdown;