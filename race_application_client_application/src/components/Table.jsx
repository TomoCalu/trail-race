import React from "react";

const Table = ({ columns, data, onRowClick, renderActions }) => {
  return (
    <table className="table w-full rounded-lg shadow-lg">
      <thead className="bg-primary text-white">
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="text-lg">
              {column.label}
            </th>
          ))}
          {renderActions && <th className="text-lg text-center">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="cursor-pointer hover:bg-gray-800 text-lg"
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="text-lg">
                {column.format
                  ? column.format(row[column.accessor])
                  : row[column.accessor]}
              </td>
            ))}
            {renderActions && (
              <td className="flex flex-row justify-center items-center space-x-2">
                {renderActions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
