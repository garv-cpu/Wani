import { useState, useMemo } from "react";

function filterLogs(logs, filter, value) {
  return logs.filter(log => {
    const date = new Date(log.timestamp);
    const logYear = date.getFullYear();
    const logMonth = date.getMonth() + 1;
    const logDay = date.getDate();

    if (filter === "day") {
      return date.toISOString().startsWith(value);
    }
    if (filter === "month") {
      const [y, m] = value.split("-");
      return logYear == y && logMonth == parseInt(m);
    }
    if (filter === "year") {
      return logYear == value;
    }

    return true;
  });
}

export default function DataTable() {
  const logs = JSON.parse(localStorage.getItem("speedLogs") || "[]");

  const [filter, setFilter] = useState("all");
  const [value, setValue] = useState("");

  const filtered = useMemo(() => {
    return filter === "all" ? logs : filterLogs(logs, filter, value);
  }, [logs, filter, value]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Speed Logs</h2>

      <div className="flex items-center gap-4 mb-4">
        <select
          className="bg-gray-800 text-white px-2 py-1 rounded"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>

        {filter !== "all" && (
          <input
            type={
              filter === "day"
                ? "date"
                : filter === "month"
                ? "month"
                : "number"
            }
            className="bg-gray-800 text-white px-2 py-1 rounded"
            onChange={e => setValue(e.target.value)}
          />
        )}
      </div>

      <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Speed (km/h)</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((log, idx) => (
            <tr key={idx} className="odd:bg-gray-700">
              <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="p-2">{log.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
