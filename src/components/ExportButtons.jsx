// src/components/ExportButtons.jsx
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ExportButtons() {
  const logs = JSON.parse(localStorage.getItem("speedLogs") || "[]");

  const exportCSV = () => {
    const csv = Papa.unparse(logs);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    download(url, "speed-logs.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Timestamp", "Speed"]],
      body: logs.map((log) => [
        new Date(log.timestamp).toLocaleString(),
        log.speed + " km/h",
      ]),
    });
    doc.save("speed-logs.pdf");
  };

  const download = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };

  return (
    <div className="flex gap-4 p-4">
      <button onClick={exportCSV} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
        Export CSV
      </button>
      <button onClick={exportPDF} className="bg-red-600 text-white px-4 py-2 rounded-lg shadow">
        Export PDF
      </button>
    </div>
  );
}
