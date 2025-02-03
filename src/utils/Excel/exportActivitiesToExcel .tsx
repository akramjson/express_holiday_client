import * as XLSX from "xlsx";
import { ticketSchematype } from "../../types/Tickets/schema";
// Types
interface ExportTickets {
  Date: string;
  Time: string;
  Number: number;
  Status: string;
  Category: string;
  SubCategory: string;
}

export const exportActivitiesToExcel = (tickets: ticketSchematype[]) => {
  const exportData: ExportTickets[] = tickets.map((ticket) => {
    return {
      Date: new Date(ticket.created_at).toLocaleDateString(),
      Time: new Date(ticket.created_at).toLocaleTimeString(),
      Number: ticket.ticket_id,
      Status: ticket.status,
      Category: ticket.category,
      SubCategory: ticket.sub_category,
    };
  });

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Add column widths
  worksheet["!cols"] = [
    { wch: 15 }, // Date
    { wch: 10 }, // Time
    { wch: 10 }, // Number
    { wch: 15 }, // Status
    { wch: 20 }, // Category
    { wch: 20 }, // SubCategory
    { wch: 30 }, // User (Full Name + Email)
  ];

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Activities");

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create Blob and download
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `activities_export_${
    new Date().toISOString().split("T")[0]
  }.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
