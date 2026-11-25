import { useState } from "react";
import { Trash2, Link as LinkIcon } from "lucide-react";
import { useAppointments, SLOTS } from "../data/store";

const statusColors = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Appointments() {
  const { appointments, setStatus, remove } = useAppointments();
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState(false);

  const sorted = [...appointments].sort((a, b) =>
    a.date === b.date ? SLOTS.indexOf(a.time) - SLOTS.indexOf(b.time) : a.date.localeCompare(b.date)
  );
  const visible = filter === "All" ? sorted : sorted.filter((a) => a.status === filter);
  const pending = appointments.filter((a) => a.status === "Pending").length;

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/book`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
          <p className="text-sm text-gray-500">{pending} waiting for confirmation</p>
        </div>
        <button
          onClick={copyLink}
          className="flex items-center gap-2 border bg-white px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
        >
          <LinkIcon size={16} /> {copied ? "Link copied ✓" : "Copy booking link"}
        </button>
      </div>

      <div className="flex gap-2">
        {["All", "Pending", "Confirmed", "Cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm border ${
              filter === f ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Treatment</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{a.code}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{a.patient}</p>
                  <p className="text-gray-500 text-xs">{a.phone}</p>
                </td>
                <td className="px-4 py-3">{a.treatment}</td>
                <td className="px-4 py-3">{a.date}</td>
                <td className="px-4 py-3">{a.time}</td>
                <td className="px-4 py-3">{a.price.toLocaleString()} EGP</td>
                <td className="px-4 py-3">
                  <select
                    value={a.status}
                    onChange={(e) => setStatus(a.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs border-0 ${statusColors[a.status]}`}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => remove(a.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">No appointments yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}