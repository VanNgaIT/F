import React from 'react';
import { CSVLink } from 'react-csv';
import { json2csv } from 'json2csv';

const ExportData = ({ data }) => {
  // Chuyển đổi dữ liệu JSON thành CSV
  const handleExportCSV = () => {
    const csv = json2csv(data);  // Dữ liệu cần xuất
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = 'dashboard-data.csv';
    link.click();
  };

  return (
    <div>
      <button onClick={handleExportCSV}>Export as CSV</button>
      <CSVLink data={data} filename="dashboard-data.csv">
        <button>Export as CSV (Using CSVLink)</button>
      </CSVLink>
    </div>
  );
};

export default ExportData;
