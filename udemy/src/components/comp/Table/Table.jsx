import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ data, headers }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      setSortedData(data);
      setSortConfig({ key: null, direction: 'asc' });
      return;
    }

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <TableHeader headers={headers} sortConfig={sortConfig} onSort={handleSort} />
        <TableBody data={sortedData} headers={headers} />
      </table>
    </div>
  );
};

export default Table;