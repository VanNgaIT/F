import React from 'react';
import * as XLSX from 'xlsx';

const ExportExcel = ({ data }) => {
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data); // Chuyển đổi dữ liệu JSON thành sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dashboard Data");

    // Xuất dữ liệu ra file Excel
    XLSX.writeFile(wb, "dashboard-data.xlsx");
  };

  return (
    <div>
      <button onClick={handleExportExcel}>Export as Excel</button>
    </div>
  );
};

export default ExportExcel;
