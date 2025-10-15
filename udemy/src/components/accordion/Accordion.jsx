import React, { useState } from 'react';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';

const Accordion = ({ items }) => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleItem = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = expandedIndexes.includes(index);

    const icon = (
      <span
        className={`ml-2 text-blue-500 transition-transform duration-300 ${
          isExpanded ? 'rotate-180' : ''
        }`}
      >
        {isExpanded ? <GoChevronUp /> : <GoChevronDown />}
      </span>
    );

    return (
      <div key={item.id} className="border-b last:border-none">
        <div
          className="flex items-center justify-between p-4 cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-lg shadow transition-all duration-300"
          onClick={() => toggleItem(index)}
        >
          <span className="text-lg font-semibold text-blue-700">{item.label}</span>
          {icon}
        </div>
        {isExpanded && (
          <div className="border border-t-0 p-5 bg-white rounded-lg shadow transition-all duration-300">
            <p className="text-gray-600">{item.content}</p>
          </div>
        )}
      </div>
    );
  });

  return <div className="space-y-4">{renderedItems}</div>;
};

export default Accordion;