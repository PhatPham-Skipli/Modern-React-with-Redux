import React from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const TableHeader = ({ headers, sortConfig, onSort }) => {
  return (
    <thead className="bg-blue-500 text-white">
      <tr>
        {headers.map((header) => (
          <th
            key={header.key}
            className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer hover:bg-blue-600 hover:text-white transition"
            onClick={() => onSort(header.key)}
          >
            {header.label}
            {sortConfig.key === header.key && (
              <span className="ml-2 inline-block">
                {sortConfig.direction === 'asc' ? (
                  <FaSortUp className="text-white" />
                ) : (
                  <FaSortDown className="text-white" />
                )}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;