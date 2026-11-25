import { useState } from "react";
import { invoices as initialInvoices } from "../data/mockData";

const statusColors = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
};

export default function Billing() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [filter, setFilter] = useState("All");

  const total = (status) =>
    invoices.filter((i) => i.status === status).reduce((sum, i) => sum + i.amount, 0);

  const markPaid = (id) =>
    setInvoices(invoices.map((i) => (i.id === id ? { ...i, status: "Paid" } : i)));

  const visible = filter === "All" ? invoices : invoices.filter((i) => i.status === filter);

  const cards = [
    { label: "Paid", value: total("Paid") },
    { label: "Pending", value: total("Pending") },
    { label: "Overdue", value: total("Overdue") },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Billing</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border rounded-xl p-5">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{c.value.toLocaleString()} EGP</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {["All", "Paid", "Pending", "Overdue"].map((f) => (
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

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Treatment</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((i) => (
              <tr key={i.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{i.id}</td>
                <td className="px-4 py-3">{i.patient}</td>
                <td className="px-4 py-3">{i.treatment}</td>
                <td className="px-4 py-3">{i.amount.toLocaleString()} EGP</td>
                <td className="px-4 py-3">{i.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[i.status]}`}>{i.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  {i.status !== "Paid" && (
                    <button onClick={() => markPaid(i.id)} className="text-teal-600 text-xs hover:underline">
                      Mark as paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}