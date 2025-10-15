import React, { useState } from 'react';
import Dropdown from '../../components/dropdown/Dropdown';

const DropdownPage = () => {
  const [selection, setSelection] = useState(null);

  const handleSelect = (option) => {
    setSelection(option);
  };

  const options = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
  ];

  return (
    <div className="mt-16 flex justify-center items-start">
      <Dropdown options={options} selection={selection} onSelect={handleSelect} />
    </div>
  );
};

export default DropdownPage;