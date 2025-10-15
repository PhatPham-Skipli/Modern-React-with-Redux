import React from 'react';

const TableBody = ({ data, headers }) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className={`border-b ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          {headers.map((header) => (
            <td key={header.key} className="px-6 py-4 text-sm text-gray-700">
              {header.key === 'color' ? (
                <span
                  className={`inline-block w-6 h-6 rounded-full ${row[header.key]}`}
                ></span>
              ) : (
                row[header.key]
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;