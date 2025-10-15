import Table from '../../components/comp/Table/Table';

const TablePage = () => {
  const dataHeader = [
    { label: 'Name', key: 'name' },
    { label: 'Color', key: 'color' },
    { label: 'Score', key: 'score' },
  ];

  const data = [
    { name: 'Orange', color: 'bg-orange-500', score: 5 },
    { name: 'Apple', color: 'bg-red-500', score: 3 },
    { name: 'Banana', color: 'bg-yellow-500', score: 1 },
    { name: 'Lime', color: 'bg-green-500', score: 4 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Table Page</h1>
      <Table data={data} headers={dataHeader} />
    </div>
  );
};

export default TablePage;