import React from 'react';

const AdminTable = ({ title, columns, data, onDelete, onEdit }) => {
  return (
    <div className="mb-10">
      <h2 className="font-semibold text-lg mb-2 text-blue-600">{title}</h2>
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">{col.label}</th>
              ))}
              <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map(row => (
              <tr key={row._id}>
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-2 text-sm text-gray-700">{row[col.key]}</td>
                ))}
                <td className="px-4 py-2 flex gap-2">
                  {onEdit && <button onClick={() => onEdit(row)} className="text-blue-600 hover:underline">Edit</button>}
                  <button onClick={() => onDelete(row._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
